"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/dashboard/[workspaceid]/review/quiz/page",{

/***/ "(app-pages-browser)/./src/app/dashboard/[workspaceid]/review/quiz/page.js":
/*!*************************************************************!*\
  !*** ./src/app/dashboard/[workspaceid]/review/quiz/page.js ***!
  \*************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ WorkspacePage; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _components_built_quizcard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/built/quizcard */ \"(app-pages-browser)/./src/components/built/quizcard.jsx\");\n/* harmony import */ var _components_built_workspacenavbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/built/workspacenavbar */ \"(app-pages-browser)/./src/components/built/workspacenavbar.jsx\");\n/* harmony import */ var _components_context_themecontext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/context/themecontext */ \"(app-pages-browser)/./src/components/context/themecontext.jsx\");\n/* harmony import */ var _components_ui_card_hover_effect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/ui/card-hover-effect */ \"(app-pages-browser)/./src/components/ui/card-hover-effect.jsx\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\nfunction WorkspacePage() {\n    _s();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_5__.useRouter)();\n    const { workspaceid, topicid } = (0,next_navigation__WEBPACK_IMPORTED_MODULE_5__.useParams)();\n    const [activeSection, setActiveSection] = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(\"int\");\n    const [activeTab, setActiveTab] = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(\"review\");\n    const sectionRefs = (0,react__WEBPACK_IMPORTED_MODULE_6__.useRef)({});\n    const projects = [\n        {\n            title: \"Quiz 1 - Introduction\",\n            id: \"123\",\n            description: \"Pre built quizzes to help you test your knowledge on various topics.\",\n            link: \"/dashboard/\".concat(workspaceid, \"/review/quiz/\", 123)\n        },\n        {\n            title: \"Quiz 2 - Advanced\",\n            id: \"456\",\n            description: \"Quiz to help you memorize important concepts and terms.\",\n            link: \"/dashboard/\".concat(workspaceid, \"/review/quiz/\", 456)\n        },\n        {\n            title: \"Quiz 2 - Advanced\",\n            id: \"456\",\n            description: \"Quiz to help you memorize important concepts and terms.\",\n            link: \"/dashboard/\".concat(workspaceid, \"/review/quiz/\", 456)\n        },\n        {\n            title: \"Quiz 2 - Advanced\",\n            id: \"456\",\n            description: \"Quiz to help you memorize important concepts and terms.\",\n            link: \"/dashboard/\".concat(workspaceid, \"/review/quiz/\", 456)\n        }\n    ];\n    const handleTabChange = (tab)=>{\n        setActiveTab(tab);\n        if (tab === \"overview\") {\n            router.push(\"/dashboard/\".concat(workspaceid, \"/introduction\"));\n        } else {\n            router.push(\"/dashboard/\".concat(workspaceid, \"/\").concat(tab));\n        }\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_6__.useEffect)(()=>{\n        const element = sectionRefs.current[topicid];\n        if (element) {\n            element.scrollIntoView({\n                behavior: \"smooth\"\n            });\n        }\n    }, [\n        topicid\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_context_themecontext__WEBPACK_IMPORTED_MODULE_3__.ThemeProvider, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_built_workspacenavbar__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                workspaceid: workspaceid\n            }, void 0, false, {\n                fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                lineNumber: 69,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex h-screen\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"w-screen py-[64px] overflow-y-auto\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"flex px-8 mb-8 sticky top-[-10px] z-10 bg-white dark:bg-neutral-900 p-2 shadow-md\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    onClick: ()=>handleTabChange(\"overview\"),\n                                    className: \"p-4 \".concat(activeTab === \"overview\" ? \"border-b-2 border-blue-500 font-semibold\" : \"\"),\n                                    children: \"Overview\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                                    lineNumber: 75,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    onClick: ()=>handleTabChange(\"review\"),\n                                    className: \"p-4 \".concat(activeTab === \"review\" ? \"border-b-2 border-blue-500 font-semibold\" : \"\"),\n                                    children: \"Review\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                                    lineNumber: 81,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    onClick: ()=>handleTabChange(\"mindmap\"),\n                                    className: \"p-4 \".concat(activeTab === \"mindmap\" ? \"border-b-2 border-blue-500 font-semibold\" : \"\"),\n                                    children: \"Mindmap\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                                    lineNumber: 87,\n                                    columnNumber: 13\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                            lineNumber: 74,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"max-w-5xl mx-auto px-8\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"flex flex-wrap\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card_hover_effect__WEBPACK_IMPORTED_MODULE_4__.HoverEffect, {\n                                    items: projects\n                                }, void 0, false, {\n                                    fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                                    lineNumber: 98,\n                                    columnNumber: 13\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                                lineNumber: 97,\n                                columnNumber: 13\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                            lineNumber: 96,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                    lineNumber: 72,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                lineNumber: 70,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n        lineNumber: 68,\n        columnNumber: 5\n    }, this);\n}\n_s(WorkspacePage, \"JtLRMLgFdpsKD9/r6kwH/jPKRJY=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_5__.useRouter,\n        next_navigation__WEBPACK_IMPORTED_MODULE_5__.useParams\n    ];\n});\n_c = WorkspacePage;\nvar _c;\n$RefreshReg$(_c, \"WorkspacePage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvZGFzaGJvYXJkL1t3b3Jrc3BhY2VpZF0vcmV2aWV3L3F1aXovcGFnZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUN1RDtBQUNVO0FBQ0M7QUFDRjtBQUNUO0FBQ0g7QUFJckMsU0FBU1M7O0lBQ3RCLE1BQU1DLFNBQVNMLDBEQUFTQTtJQUN4QixNQUFNLEVBQUVNLFdBQVcsRUFBRUMsT0FBTyxFQUFFLEdBQUdSLDBEQUFTQTtJQUUxQyxNQUFNLENBQUNTLGVBQWVDLGlCQUFpQixHQUFHTiwrQ0FBUUEsQ0FBQztJQUNuRCxNQUFNLENBQUNPLFdBQVdDLGFBQWEsR0FBR1IsK0NBQVFBLENBQUM7SUFDM0MsTUFBTVMsY0FBY1YsNkNBQU1BLENBQUMsQ0FBQztJQUU1QixNQUFNVyxXQUFXO1FBQ2Y7WUFDRUMsT0FBTztZQUNQQyxJQUFLO1lBQ0xDLGFBQ0U7WUFDSEMsTUFBTSxjQUE2QyxPQUEvQlgsYUFBWSxpQkFBZTtRQUNoRDtRQUNBO1lBQ0VRLE9BQU87WUFDUEMsSUFBSztZQUNMQyxhQUNFO1lBQ0ZDLE1BQU0sY0FBNkMsT0FBL0JYLGFBQVksaUJBQWU7UUFDakQ7UUFDQTtZQUNFUSxPQUFPO1lBQ1BDLElBQUs7WUFDTEMsYUFDRTtZQUNGQyxNQUFNLGNBQTZDLE9BQS9CWCxhQUFZLGlCQUFlO1FBQ2pEO1FBQ0E7WUFDRVEsT0FBTztZQUNQQyxJQUFLO1lBQ0xDLGFBQ0U7WUFDRkMsTUFBTSxjQUE2QyxPQUEvQlgsYUFBWSxpQkFBZTtRQUNqRDtLQUNEO0lBR0QsTUFBTVksa0JBQWtCLENBQUNDO1FBQ3ZCUixhQUFhUTtRQUNiLElBQUlBLFFBQVEsWUFBWTtZQUN0QmQsT0FBT2UsSUFBSSxDQUFDLGNBQTBCLE9BQVpkLGFBQVk7UUFDeEMsT0FBTztZQUNMRCxPQUFPZSxJQUFJLENBQUMsY0FBNkJELE9BQWZiLGFBQVksS0FBTyxPQUFKYTtRQUMzQztJQUNGO0lBRUFsQixnREFBU0EsQ0FBQztRQUNSLE1BQU1vQixVQUFVVCxZQUFZVSxPQUFPLENBQUNmLFFBQVE7UUFDNUMsSUFBSWMsU0FBUztZQUNYQSxRQUFRRSxjQUFjLENBQUM7Z0JBQUVDLFVBQVU7WUFBUztRQUM5QztJQUNGLEdBQUc7UUFBQ2pCO0tBQVE7SUFFWixxQkFDRSw4REFBQ1YsMkVBQWFBOzswQkFDWiw4REFBQ0QseUVBQWVBO2dCQUFDVSxhQUFhQTs7Ozs7OzBCQUM5Qiw4REFBQ21CO2dCQUFJQyxXQUFVOzBCQUViLDRFQUFDRDtvQkFBSUMsV0FBVTs7c0NBRWIsOERBQUNEOzRCQUFJQyxXQUFVOzs4Q0FDYiw4REFBQ0M7b0NBQ0NDLFNBQVMsSUFBTVYsZ0JBQWdCO29DQUMvQlEsV0FBVyxPQUFrRixPQUEzRWhCLGNBQWMsYUFBYSw2Q0FBNkM7OENBQzNGOzs7Ozs7OENBR0QsOERBQUNpQjtvQ0FDQ0MsU0FBUyxJQUFNVixnQkFBZ0I7b0NBQy9CUSxXQUFXLE9BQWdGLE9BQXpFaEIsY0FBYyxXQUFXLDZDQUE2Qzs4Q0FDekY7Ozs7Ozs4Q0FHRCw4REFBQ2lCO29DQUNDQyxTQUFTLElBQU1WLGdCQUFnQjtvQ0FDL0JRLFdBQVcsT0FBaUYsT0FBMUVoQixjQUFjLFlBQVksNkNBQTZDOzhDQUMxRjs7Ozs7Ozs7Ozs7O3NDQU1ILDhEQUFDZTs0QkFBSUMsV0FBVTtzQ0FDYiw0RUFBQ0Q7Z0NBQUlDLFdBQVU7MENBQ2YsNEVBQUM1Qix5RUFBV0E7b0NBQUMrQixPQUFPaEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9oQztHQTlGd0JUOztRQUNQSixzREFBU0E7UUFDU0Qsc0RBQVNBOzs7S0FGcEJLIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvZGFzaGJvYXJkL1t3b3Jrc3BhY2VpZF0vcmV2aWV3L3F1aXovcGFnZS5qcz8wYTk2Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xuaW1wb3J0IHsgUXVpekNhcmQgfSBmcm9tICdAL2NvbXBvbmVudHMvYnVpbHQvcXVpemNhcmQnO1xuaW1wb3J0IFdvcmtzcGFjZU5hdmJhciBmcm9tICdAL2NvbXBvbmVudHMvYnVpbHQvd29ya3NwYWNlbmF2YmFyJztcbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIgfSBmcm9tICdAL2NvbXBvbmVudHMvY29udGV4dC90aGVtZWNvbnRleHQnO1xuaW1wb3J0IHsgSG92ZXJFZmZlY3QgfSBmcm9tICdAL2NvbXBvbmVudHMvdWkvY2FyZC1ob3Zlci1lZmZlY3QnO1xuaW1wb3J0IHsgdXNlUGFyYW1zLCB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L25hdmlnYXRpb24nO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gV29ya3NwYWNlUGFnZSgpIHtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gIGNvbnN0IHsgd29ya3NwYWNlaWQsIHRvcGljaWQgfSA9IHVzZVBhcmFtcygpO1xuXG4gIGNvbnN0IFthY3RpdmVTZWN0aW9uLCBzZXRBY3RpdmVTZWN0aW9uXSA9IHVzZVN0YXRlKCdpbnQnKTtcbiAgY29uc3QgW2FjdGl2ZVRhYiwgc2V0QWN0aXZlVGFiXSA9IHVzZVN0YXRlKCdyZXZpZXcnKTtcbiAgY29uc3Qgc2VjdGlvblJlZnMgPSB1c2VSZWYoe30pO1xuXG4gIGNvbnN0IHByb2plY3RzID0gW1xuICAgIHtcbiAgICAgIHRpdGxlOiBcIlF1aXogMSAtIEludHJvZHVjdGlvblwiLFxuICAgICAgaWQgOiBcIjEyM1wiLFxuICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgIFwiUHJlIGJ1aWx0IHF1aXp6ZXMgdG8gaGVscCB5b3UgdGVzdCB5b3VyIGtub3dsZWRnZSBvbiB2YXJpb3VzIHRvcGljcy5cIixcbiAgICAgbGluazogYC9kYXNoYm9hcmQvJHt3b3Jrc3BhY2VpZH0vcmV2aWV3L3F1aXovJHsxMjN9YCxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiBcIlF1aXogMiAtIEFkdmFuY2VkXCIsXG4gICAgICBpZCA6IFwiNDU2XCIsXG4gICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgXCJRdWl6IHRvIGhlbHAgeW91IG1lbW9yaXplIGltcG9ydGFudCBjb25jZXB0cyBhbmQgdGVybXMuXCIsXG4gICAgICBsaW5rOiBgL2Rhc2hib2FyZC8ke3dvcmtzcGFjZWlkfS9yZXZpZXcvcXVpei8kezQ1Nn1gLFxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6IFwiUXVpeiAyIC0gQWR2YW5jZWRcIixcbiAgICAgIGlkIDogXCI0NTZcIixcbiAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICBcIlF1aXogdG8gaGVscCB5b3UgbWVtb3JpemUgaW1wb3J0YW50IGNvbmNlcHRzIGFuZCB0ZXJtcy5cIixcbiAgICAgIGxpbms6IGAvZGFzaGJvYXJkLyR7d29ya3NwYWNlaWR9L3Jldmlldy9xdWl6LyR7NDU2fWAsXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogXCJRdWl6IDIgLSBBZHZhbmNlZFwiLFxuICAgICAgaWQgOiBcIjQ1NlwiLFxuICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgIFwiUXVpeiB0byBoZWxwIHlvdSBtZW1vcml6ZSBpbXBvcnRhbnQgY29uY2VwdHMgYW5kIHRlcm1zLlwiLFxuICAgICAgbGluazogYC9kYXNoYm9hcmQvJHt3b3Jrc3BhY2VpZH0vcmV2aWV3L3F1aXovJHs0NTZ9YCxcbiAgICB9LFxuICBdO1xuXG5cbiAgY29uc3QgaGFuZGxlVGFiQ2hhbmdlID0gKHRhYikgPT4ge1xuICAgIHNldEFjdGl2ZVRhYih0YWIpO1xuICAgIGlmICh0YWIgPT09ICdvdmVydmlldycpIHtcbiAgICAgIHJvdXRlci5wdXNoKGAvZGFzaGJvYXJkLyR7d29ya3NwYWNlaWR9L2ludHJvZHVjdGlvbmApO1xuICAgIH0gZWxzZSB7XG4gICAgICByb3V0ZXIucHVzaChgL2Rhc2hib2FyZC8ke3dvcmtzcGFjZWlkfS8ke3RhYn1gKTtcbiAgICB9XG4gIH07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gc2VjdGlvblJlZnMuY3VycmVudFt0b3BpY2lkXTtcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJyB9KTtcbiAgICB9XG4gIH0sIFt0b3BpY2lkXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8VGhlbWVQcm92aWRlcj5cbiAgICAgIDxXb3Jrc3BhY2VOYXZiYXIgd29ya3NwYWNlaWQ9e3dvcmtzcGFjZWlkfSAvPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGgtc2NyZWVuXCI+XG4gICAgICAgIHsvKiBSaWdodDogQ29udGVudCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LXNjcmVlbiBweS1bNjRweF0gb3ZlcmZsb3cteS1hdXRvXCI+XG4gICAgICAgICAgey8qIFRhYnMgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IHB4LTggbWItOCBzdGlja3kgdG9wLVstMTBweF0gei0xMCBiZy13aGl0ZSBkYXJrOmJnLW5ldXRyYWwtOTAwIHAtMiBzaGFkb3ctbWRcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlVGFiQ2hhbmdlKCdvdmVydmlldycpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTQgJHthY3RpdmVUYWIgPT09ICdvdmVydmlldycgPyAnYm9yZGVyLWItMiBib3JkZXItYmx1ZS01MDAgZm9udC1zZW1pYm9sZCcgOiAnJ31gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBPdmVydmlld1xuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVRhYkNoYW5nZSgncmV2aWV3Jyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtNCAke2FjdGl2ZVRhYiA9PT0gJ3JldmlldycgPyAnYm9yZGVyLWItMiBib3JkZXItYmx1ZS01MDAgZm9udC1zZW1pYm9sZCcgOiAnJ31gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBSZXZpZXdcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVUYWJDaGFuZ2UoJ21pbmRtYXAnKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC00ICR7YWN0aXZlVGFiID09PSAnbWluZG1hcCcgPyAnYm9yZGVyLWItMiBib3JkZXItYmx1ZS01MDAgZm9udC1zZW1pYm9sZCcgOiAnJ31gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBNaW5kbWFwXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBRdWl6IENhcmRzOiBUaHJlZSBwZXIgUm93ICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctNXhsIG14LWF1dG8gcHgtOFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgPEhvdmVyRWZmZWN0IGl0ZW1zPXtwcm9qZWN0c30gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvVGhlbWVQcm92aWRlcj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJRdWl6Q2FyZCIsIldvcmtzcGFjZU5hdmJhciIsIlRoZW1lUHJvdmlkZXIiLCJIb3ZlckVmZmVjdCIsInVzZVBhcmFtcyIsInVzZVJvdXRlciIsInVzZUVmZmVjdCIsInVzZVJlZiIsInVzZVN0YXRlIiwiV29ya3NwYWNlUGFnZSIsInJvdXRlciIsIndvcmtzcGFjZWlkIiwidG9waWNpZCIsImFjdGl2ZVNlY3Rpb24iLCJzZXRBY3RpdmVTZWN0aW9uIiwiYWN0aXZlVGFiIiwic2V0QWN0aXZlVGFiIiwic2VjdGlvblJlZnMiLCJwcm9qZWN0cyIsInRpdGxlIiwiaWQiLCJkZXNjcmlwdGlvbiIsImxpbmsiLCJoYW5kbGVUYWJDaGFuZ2UiLCJ0YWIiLCJwdXNoIiwiZWxlbWVudCIsImN1cnJlbnQiLCJzY3JvbGxJbnRvVmlldyIsImJlaGF2aW9yIiwiZGl2IiwiY2xhc3NOYW1lIiwiYnV0dG9uIiwib25DbGljayIsIml0ZW1zIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/dashboard/[workspaceid]/review/quiz/page.js\n"));

/***/ })

});