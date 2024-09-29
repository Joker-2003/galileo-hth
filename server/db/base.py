from typing import Annotated

from bson import ObjectId
from pydantic.functional_validators import AfterValidator


def check_object_id(value: str) -> str:
    if not ObjectId.is_valid(value):
        raise ValueError('Invalid ObjectId')
    return value


PyObjectId = Annotated[str, AfterValidator(check_object_id)]
