import os
from typing import Optional

from googleapiclient.discovery import build
from pprint import pprint

from youtube_transcript_api import YouTubeTranscriptApi
from pydantic import BaseModel


class Thumbnail(BaseModel):
    url: str
    width: int
    height: int


class Thumbnails(BaseModel):
    default: Thumbnail
    medium: Thumbnail
    high: Thumbnail


class SearchSnippet(BaseModel):
    channelId: str
    channelTitle: str
    description: str
    liveBroadcastContent: str
    publishTime: str
    publishedAt: str
    thumbnails: Thumbnails
    title: str


class PlaylistSnippet(BaseModel):
    channelId: str
    channelTitle: str
    description: str
    playlistId: str
    publishedAt: str
    resourceId: dict
    thumbnails: Thumbnails
    title: str
    videoOwnerChannelId: str
    videoOwnerChannelTitle: str


class YoutubeSearchKind(BaseModel):
    kind: str
    videoId: Optional[str] = None
    playlistId: Optional[str] = None


class YoutubeSearchItem(BaseModel):
    etag: str
    id: YoutubeSearchKind
    kind: str
    snippet: SearchSnippet


class YoutubeSearchResponse(BaseModel):
    etag: str
    items: list[YoutubeSearchItem]
    kind: str
    nextPageToken: str
    regionCode: str


class YoutubePlaylistItem(BaseModel):
    etag: str
    id: str
    kind: str
    snippet: PlaylistSnippet


class YoutubePlaylistResponse(BaseModel):
    etag: str
    items: list[YoutubePlaylistItem]
    kind: str
    nextPageToken: str
    pageInfo: dict
    regionCode: str


class YoutubeChannelStatistics(BaseModel):
    hiddenSubscriberCount: bool
    subscriberCount: str
    videoCount: str
    viewCount: str


class YoutubeChannelSnippet(BaseModel):
    country: str
    customUrl: str
    description: str
    localized: dict
    publishedAt: str
    thumbnails: Thumbnails
    title: str


class YoutubeChannelResponse(BaseModel):
    etag: str
    id: str
    kind: str
    snippet: YoutubeChannelSnippet
    statistics: YoutubeChannelStatistics


class YoutubeVideoStatistics(BaseModel):
    commentCount: str
    favoriteCount: str
    likeCount: str
    viewCount: str


class YoutubeVideoSnippet(BaseModel):
    categoryId: str
    channelId: str
    channelTitle: str
    defaultAudioLanguage: str
    defaultLanguage: str
    description: str
    liveBroadcastContent: str
    localized: dict
    publishedAt: str
    thumbnails: Thumbnails
    title: str


class YoutubeVideoItem(BaseModel):
    etag: str
    id: str
    kind: str
    snippet: YoutubeVideoSnippet
    statistics: YoutubeVideoStatistics


class YoutubeVideoResponse(BaseModel):
    etag: str
    items: list[YoutubeSearchItem]
    kind: str
    pageInfo: dict


class YouTubeService:
    YOUTUBE_API_SERVICE_NAME = 'youtube'
    YOUTUBE_API_VERSION = 'v3'

    _video_categories = None

    def __init__(self):
        self.api_key = os.environ['GOOGLE_API_KEY']
        self.service = build(self.YOUTUBE_API_SERVICE_NAME, self.YOUTUBE_API_VERSION, developerKey=self.api_key)

    @property
    def video_categories(self) -> dict:
        if self._video_categories is not None:
            return self._video_categories

        categories_response = self.service.videoCategories().list(
            part='snippet',
            regionCode='US'
        ).execute()

        self._video_categories = {category['id']: category['snippet']['title']
                                  for category in categories_response['items']}
        return self._video_categories

    def search(self, query, max_results=10):
        search_response = self.service.search().list(
            q=query,
            part='snippet',
            maxResults=max_results
        ).execute()
        return search_response

    @classmethod
    def get_transcript(cls, video_id: str):
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        return ' '.join([line['text'] for line in transcript])

    def search_videos(self, query: str, max_results: int = 10):
        response = self.service.search().list(
            q=query,
            part='snippet',
            maxResults=max_results
        ).execute()

        pprint(response)
        return YoutubeSearchResponse(**response)

    def get_playlist_videos(self, playlist_id: str):
        response = self.service.playlistItems().list(
            playlistId=playlist_id,
            part='snippet',
            maxResults=10
        ).execute()

        return YoutubePlaylistResponse(**response)

    def get_channel_videos(self, channel_id: str):
        uploads_response = self.service.channels().list(
            part='contentDetails',
            id=channel_id
        ).execute()
        uploads_playlist_id = uploads_response['items'][0]['contentDetails']['relatedPlaylists']['uploads']
        return self.get_playlist_videos(uploads_playlist_id)

    def get_channel_info(self, channel_id: str):
        response = self.service.channels().list(
            part='snippet,statistics',
            id=channel_id
        ).execute()
        return YoutubeChannelResponse(**response)

    def get_video_info(self, video_id: str):
        response = self.service.videos().list(
            id=video_id,
            part='snippet,statistics'
        ).execute()
        return YoutubeVideoResponse(**response)
