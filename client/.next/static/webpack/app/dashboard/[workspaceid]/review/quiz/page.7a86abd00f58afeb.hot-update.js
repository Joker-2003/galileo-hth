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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ WorkspacePage; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _components_built_quizcard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/built/quizcard */ \"(app-pages-browser)/./src/components/built/quizcard.jsx\");\n/* harmony import */ var _components_built_workspacenavbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/built/workspacenavbar */ \"(app-pages-browser)/./src/components/built/workspacenavbar.jsx\");\n/* harmony import */ var _components_context_themecontext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/context/themecontext */ \"(app-pages-browser)/./src/components/context/themecontext.jsx\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nconst topics = [\n    {\n        id: \"introduction\",\n        title: \"Introduction\",\n        body: [\n            {\n                type: \"text\",\n                content: \"Lorem ipsum odor amet, consectetuer adipiscing elit.\"\n            },\n            {\n                type: \"image\",\n                src: \"https://i.redd.it/vrhjcvtakw661.jpg\"\n            }\n        ]\n    },\n    {\n        id: \"lesson1\",\n        title: \"Lesson 1: Basics\",\n        body: [\n            {\n                type: \"text\",\n                content: \"Hello, this is the introduction!\"\n            },\n            {\n                type: \"image\",\n                src: \"https://i.redd.it/vrhjcvtakw661.jpg\"\n            }\n        ]\n    },\n    {\n        id: \"lesson2\",\n        title: \"Lesson 2: Advanced\",\n        body: [\n            {\n                type: \"text\",\n                content: \"Hello, this is the advanced section!\"\n            },\n            {\n                type: \"image\",\n                src: \"https://i.redd.it/vrhjcvtakw661.jpg\"\n            }\n        ]\n    }\n];\nfunction WorkspacePage() {\n    _s();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_4__.useRouter)();\n    const { workspaceid, topicid } = (0,next_navigation__WEBPACK_IMPORTED_MODULE_4__.useParams)();\n    const [activeSection, setActiveSection] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(\"int\");\n    const [activeTab, setActiveTab] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(\"review\");\n    const sectionRefs = (0,react__WEBPACK_IMPORTED_MODULE_5__.useRef)({});\n    const projects = [\n        {\n            title: \"Quizzes\",\n            description: \"Pre built quizzes to help you test your knowledge on various topics.\",\n            link: \"/dashboard/\".concat(workspaceid, \"/review/flashcards/456\")\n        },\n        {\n            title: \"Flashcards\",\n            description: \"Flashcards to help you memorize important concepts and terms.\",\n            link: \"/dashboard/\".concat(workspaceid, \"/review/flashcards/123\")\n        }\n    ];\n    const handleNavigation = (topic)=>{\n        setActiveSection(topic);\n        router.push(\"/dashboard/\".concat(workspaceid, \"/\").concat(topic));\n    };\n    const handleTabChange = (tab)=>{\n        setActiveTab(tab);\n        if (tab === \"overview\") {\n            router.push(\"/dashboard/\".concat(workspaceid, \"/introduction\"));\n        } else {\n            router.push(\"/dashboard/\".concat(workspaceid, \"/\").concat(tab));\n        }\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(()=>{\n        const element = sectionRefs.current[topicid];\n        if (element) {\n            element.scrollIntoView({\n                behavior: \"smooth\"\n            });\n        }\n    }, [\n        topicid\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_context_themecontext__WEBPACK_IMPORTED_MODULE_3__.ThemeProvider, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_built_workspacenavbar__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                workspaceid: workspaceid\n            }, void 0, false, {\n                fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                lineNumber: 77,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex h-screen\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"w-screen py-[64px] overflow-y-auto\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"flex px-8 mb-8 sticky top-[-10px] z-10 bg-white dark:bg-neutral-900 p-2 shadow-md\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    onClick: ()=>handleTabChange(\"overview\"),\n                                    className: \"p-4 \".concat(activeTab === \"overview\" ? \"border-b-2 border-blue-500 font-semibold\" : \"\"),\n                                    children: \"Overview\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                                    lineNumber: 83,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    onClick: ()=>handleTabChange(\"review\"),\n                                    className: \"p-4 \".concat(activeTab === \"review\" ? \"border-b-2 border-blue-500 font-semibold\" : \"\"),\n                                    children: \"Review\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                                    lineNumber: 89,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    onClick: ()=>handleTabChange(\"mindmap\"),\n                                    className: \"p-4 \".concat(activeTab === \"mindmap\" ? \"border-b-2 border-blue-500 font-semibold\" : \"\"),\n                                    children: \"Mindmap\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                                    lineNumber: 95,\n                                    columnNumber: 13\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                            lineNumber: 82,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"max-w-5xl mx-auto px-8\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"flex flex-wrap justify-between space-y-4\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"w-full md:w-1/3 px-2\",\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_built_quizcard__WEBPACK_IMPORTED_MODULE_1__.QuizCard, {\n                                            text: \"Quiz Card\",\n                                            description: \"This is a quiz card\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                                            lineNumber: 108,\n                                            columnNumber: 17\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                                        lineNumber: 107,\n                                        columnNumber: 15\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"w-full md:w-1/3 px-2\",\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_built_quizcard__WEBPACK_IMPORTED_MODULE_1__.QuizCard, {\n                                            text: \"Quiz Card\",\n                                            description: \"This is a quiz card\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                                            lineNumber: 111,\n                                            columnNumber: 17\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                                        lineNumber: 110,\n                                        columnNumber: 15\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"w-full md:w-1/3 px-2\",\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_built_quizcard__WEBPACK_IMPORTED_MODULE_1__.QuizCard, {\n                                            text: \"Quiz Card\",\n                                            description: \"This is a quiz card\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                                            lineNumber: 114,\n                                            columnNumber: 17\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                                        lineNumber: 113,\n                                        columnNumber: 15\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"w-full md:w-1/3 px-2\",\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_built_quizcard__WEBPACK_IMPORTED_MODULE_1__.QuizCard, {\n                                            text: \"Quiz Card\",\n                                            description: \"This is a quiz card\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                                            lineNumber: 117,\n                                            columnNumber: 17\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                                        lineNumber: 116,\n                                        columnNumber: 15\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"w-full md:w-1/3 px-2\",\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_built_quizcard__WEBPACK_IMPORTED_MODULE_1__.QuizCard, {\n                                            text: \"Quiz Card\",\n                                            description: \"This is a quiz card\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                                            lineNumber: 120,\n                                            columnNumber: 17\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                                        lineNumber: 119,\n                                        columnNumber: 15\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"w-full md:w-1/3 px-2\",\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_built_quizcard__WEBPACK_IMPORTED_MODULE_1__.QuizCard, {\n                                            text: \"Quiz Card\",\n                                            description: \"This is a quiz card\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                                            lineNumber: 123,\n                                            columnNumber: 17\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                                        lineNumber: 122,\n                                        columnNumber: 15\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"w-full md:w-1/3 px-2\",\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_built_quizcard__WEBPACK_IMPORTED_MODULE_1__.QuizCard, {\n                                            text: \"Quiz Card\",\n                                            description: \"This is a quiz card\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                                            lineNumber: 126,\n                                            columnNumber: 17\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                                        lineNumber: 125,\n                                        columnNumber: 15\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"w-full md:w-1/3 px-2\",\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_built_quizcard__WEBPACK_IMPORTED_MODULE_1__.QuizCard, {\n                                            text: \"Quiz Card\",\n                                            description: \"This is a quiz card\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                                            lineNumber: 129,\n                                            columnNumber: 17\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                                        lineNumber: 128,\n                                        columnNumber: 15\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                                lineNumber: 105,\n                                columnNumber: 13\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                            lineNumber: 104,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                    lineNumber: 80,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n                lineNumber: 78,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/kovidsrivart/workstuff/ibm-galileo/client-new/src/app/dashboard/[workspaceid]/review/quiz/page.js\",\n        lineNumber: 76,\n        columnNumber: 5\n    }, this);\n}\n_s(WorkspacePage, \"JtLRMLgFdpsKD9/r6kwH/jPKRJY=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_4__.useRouter,\n        next_navigation__WEBPACK_IMPORTED_MODULE_4__.useParams\n    ];\n});\n_c = WorkspacePage;\nvar _c;\n$RefreshReg$(_c, \"WorkspacePage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvZGFzaGJvYXJkL1t3b3Jrc3BhY2VpZF0vcmV2aWV3L3F1aXovcGFnZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ3VEO0FBQ1U7QUFDQztBQUNYO0FBQ0g7QUFFcEQsTUFBTVEsU0FBUztJQUNiO1FBQ0VDLElBQUk7UUFDSkMsT0FBTztRQUNQQyxNQUFNO1lBQ0o7Z0JBQUVDLE1BQU07Z0JBQVFDLFNBQVU7WUFBc0Q7WUFDaEY7Z0JBQUVELE1BQU07Z0JBQVNFLEtBQUs7WUFBc0M7U0FDN0Q7SUFDSDtJQUNBO1FBQ0VMLElBQUk7UUFBV0MsT0FBTztRQUFvQkMsTUFBTTtZQUM5QztnQkFBRUMsTUFBTTtnQkFBUUMsU0FBUztZQUFtQztZQUM1RDtnQkFBRUQsTUFBTTtnQkFBU0UsS0FBSztZQUFzQztTQUM3RDtJQUNIO0lBQ0E7UUFDRUwsSUFBSTtRQUFXQyxPQUFPO1FBQXNCQyxNQUFNO1lBQ2hEO2dCQUFFQyxNQUFNO2dCQUFRQyxTQUFTO1lBQXVDO1lBQ2hFO2dCQUFFRCxNQUFNO2dCQUFTRSxLQUFLO1lBQXNDO1NBQzdEO0lBQ0g7Q0FDRDtBQUVjLFNBQVNDOztJQUN0QixNQUFNQyxTQUFTWiwwREFBU0E7SUFDeEIsTUFBTSxFQUFFYSxXQUFXLEVBQUVDLE9BQU8sRUFBRSxHQUFHZiwwREFBU0E7SUFFMUMsTUFBTSxDQUFDZ0IsZUFBZUMsaUJBQWlCLEdBQUdiLCtDQUFRQSxDQUFDO0lBQ25ELE1BQU0sQ0FBQ2MsV0FBV0MsYUFBYSxHQUFHZiwrQ0FBUUEsQ0FBQztJQUMzQyxNQUFNZ0IsY0FBY2pCLDZDQUFNQSxDQUFDLENBQUM7SUFFNUIsTUFBTWtCLFdBQVc7UUFDZjtZQUNFZCxPQUFPO1lBQ1BlLGFBQ0U7WUFDRkMsTUFBTSxjQUEwQixPQUFaVCxhQUFZO1FBQ2xDO1FBQ0E7WUFDRVAsT0FBTztZQUNQZSxhQUNFO1lBQ0ZDLE1BQU0sY0FBMEIsT0FBWlQsYUFBWTtRQUNsQztLQUNEO0lBRUQsTUFBTVUsbUJBQW1CLENBQUNDO1FBQ3hCUixpQkFBaUJRO1FBQ2pCWixPQUFPYSxJQUFJLENBQUMsY0FBNkJELE9BQWZYLGFBQVksS0FBUyxPQUFOVztJQUMzQztJQUVBLE1BQU1FLGtCQUFrQixDQUFDQztRQUN2QlQsYUFBYVM7UUFDYixJQUFJQSxRQUFRLFlBQVk7WUFDdEJmLE9BQU9hLElBQUksQ0FBQyxjQUEwQixPQUFaWixhQUFZO1FBQ3hDLE9BQU87WUFDTEQsT0FBT2EsSUFBSSxDQUFDLGNBQTZCRSxPQUFmZCxhQUFZLEtBQU8sT0FBSmM7UUFDM0M7SUFDRjtJQUVBMUIsZ0RBQVNBLENBQUM7UUFDUixNQUFNMkIsVUFBVVQsWUFBWVUsT0FBTyxDQUFDZixRQUFRO1FBQzVDLElBQUljLFNBQVM7WUFDWEEsUUFBUUUsY0FBYyxDQUFDO2dCQUFFQyxVQUFVO1lBQVM7UUFDOUM7SUFDRixHQUFHO1FBQUNqQjtLQUFRO0lBRVoscUJBQ0UsOERBQUNoQiwyRUFBYUE7OzBCQUNaLDhEQUFDRCx5RUFBZUE7Z0JBQUNnQixhQUFhQTs7Ozs7OzBCQUM5Qiw4REFBQ21CO2dCQUFJQyxXQUFVOzBCQUViLDRFQUFDRDtvQkFBSUMsV0FBVTs7c0NBRWIsOERBQUNEOzRCQUFJQyxXQUFVOzs4Q0FDYiw4REFBQ0M7b0NBQ0NDLFNBQVMsSUFBTVQsZ0JBQWdCO29DQUMvQk8sV0FBVyxPQUFrRixPQUEzRWhCLGNBQWMsYUFBYSw2Q0FBNkM7OENBQzNGOzs7Ozs7OENBR0QsOERBQUNpQjtvQ0FDQ0MsU0FBUyxJQUFNVCxnQkFBZ0I7b0NBQy9CTyxXQUFXLE9BQWdGLE9BQXpFaEIsY0FBYyxXQUFXLDZDQUE2Qzs4Q0FDekY7Ozs7Ozs4Q0FHRCw4REFBQ2lCO29DQUNDQyxTQUFTLElBQU1ULGdCQUFnQjtvQ0FDL0JPLFdBQVcsT0FBaUYsT0FBMUVoQixjQUFjLFlBQVksNkNBQTZDOzhDQUMxRjs7Ozs7Ozs7Ozs7O3NDQU1ILDhEQUFDZTs0QkFBSUMsV0FBVTtzQ0FDYiw0RUFBQ0Q7Z0NBQUlDLFdBQVU7O2tEQUViLDhEQUFDRDt3Q0FBSUMsV0FBVTtrREFDYiw0RUFBQ3JDLGdFQUFRQTs0Q0FBQ3dDLE1BQUs7NENBQVlmLGFBQVk7Ozs7Ozs7Ozs7O2tEQUV6Qyw4REFBQ1c7d0NBQUlDLFdBQVU7a0RBQ2IsNEVBQUNyQyxnRUFBUUE7NENBQUN3QyxNQUFLOzRDQUFZZixhQUFZOzs7Ozs7Ozs7OztrREFFekMsOERBQUNXO3dDQUFJQyxXQUFVO2tEQUNiLDRFQUFDckMsZ0VBQVFBOzRDQUFDd0MsTUFBSzs0Q0FBWWYsYUFBWTs7Ozs7Ozs7Ozs7a0RBRXpDLDhEQUFDVzt3Q0FBSUMsV0FBVTtrREFDYiw0RUFBQ3JDLGdFQUFRQTs0Q0FBQ3dDLE1BQUs7NENBQVlmLGFBQVk7Ozs7Ozs7Ozs7O2tEQUV6Qyw4REFBQ1c7d0NBQUlDLFdBQVU7a0RBQ2IsNEVBQUNyQyxnRUFBUUE7NENBQUN3QyxNQUFLOzRDQUFZZixhQUFZOzs7Ozs7Ozs7OztrREFFekMsOERBQUNXO3dDQUFJQyxXQUFVO2tEQUNiLDRFQUFDckMsZ0VBQVFBOzRDQUFDd0MsTUFBSzs0Q0FBWWYsYUFBWTs7Ozs7Ozs7Ozs7a0RBRXpDLDhEQUFDVzt3Q0FBSUMsV0FBVTtrREFDYiw0RUFBQ3JDLGdFQUFRQTs0Q0FBQ3dDLE1BQUs7NENBQVlmLGFBQVk7Ozs7Ozs7Ozs7O2tEQUV6Qyw4REFBQ1c7d0NBQUlDLFdBQVU7a0RBQ2IsNEVBQUNyQyxnRUFBUUE7NENBQUN3QyxNQUFLOzRDQUFZZixhQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRdkQ7R0ExR3dCVjs7UUFDUFgsc0RBQVNBO1FBQ1NELHNEQUFTQTs7O0tBRnBCWSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL2Rhc2hib2FyZC9bd29ya3NwYWNlaWRdL3Jldmlldy9xdWl6L3BhZ2UuanM/MGE5NiJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcbmltcG9ydCB7IFF1aXpDYXJkIH0gZnJvbSAnQC9jb21wb25lbnRzL2J1aWx0L3F1aXpjYXJkJztcbmltcG9ydCBXb3Jrc3BhY2VOYXZiYXIgZnJvbSAnQC9jb21wb25lbnRzL2J1aWx0L3dvcmtzcGFjZW5hdmJhcic7XG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyIH0gZnJvbSAnQC9jb21wb25lbnRzL2NvbnRleHQvdGhlbWVjb250ZXh0JztcbmltcG9ydCB7IHVzZVBhcmFtcywgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9uYXZpZ2F0aW9uJztcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuY29uc3QgdG9waWNzID0gW1xuICB7XG4gICAgaWQ6ICdpbnRyb2R1Y3Rpb24nLFxuICAgIHRpdGxlOiAnSW50cm9kdWN0aW9uJyxcbiAgICBib2R5OiBbXG4gICAgICB7IHR5cGU6ICd0ZXh0JywgY29udGVudDogYExvcmVtIGlwc3VtIG9kb3IgYW1ldCwgY29uc2VjdGV0dWVyIGFkaXBpc2NpbmcgZWxpdC5gIH0sXG4gICAgICB7IHR5cGU6ICdpbWFnZScsIHNyYzogXCJodHRwczovL2kucmVkZC5pdC92cmhqY3Z0YWt3NjYxLmpwZ1wiIH0sXG4gICAgXVxuICB9LFxuICB7XG4gICAgaWQ6ICdsZXNzb24xJywgdGl0bGU6ICdMZXNzb24gMTogQmFzaWNzJywgYm9keTogW1xuICAgICAgeyB0eXBlOiAndGV4dCcsIGNvbnRlbnQ6IFwiSGVsbG8sIHRoaXMgaXMgdGhlIGludHJvZHVjdGlvbiFcIiB9LFxuICAgICAgeyB0eXBlOiAnaW1hZ2UnLCBzcmM6IFwiaHR0cHM6Ly9pLnJlZGQuaXQvdnJoamN2dGFrdzY2MS5qcGdcIiB9XG4gICAgXVxuICB9LFxuICB7XG4gICAgaWQ6ICdsZXNzb24yJywgdGl0bGU6ICdMZXNzb24gMjogQWR2YW5jZWQnLCBib2R5OiBbXG4gICAgICB7IHR5cGU6ICd0ZXh0JywgY29udGVudDogXCJIZWxsbywgdGhpcyBpcyB0aGUgYWR2YW5jZWQgc2VjdGlvbiFcIiB9LFxuICAgICAgeyB0eXBlOiAnaW1hZ2UnLCBzcmM6IFwiaHR0cHM6Ly9pLnJlZGQuaXQvdnJoamN2dGFrdzY2MS5qcGdcIiB9XG4gICAgXVxuICB9LFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gV29ya3NwYWNlUGFnZSgpIHtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gIGNvbnN0IHsgd29ya3NwYWNlaWQsIHRvcGljaWQgfSA9IHVzZVBhcmFtcygpO1xuXG4gIGNvbnN0IFthY3RpdmVTZWN0aW9uLCBzZXRBY3RpdmVTZWN0aW9uXSA9IHVzZVN0YXRlKCdpbnQnKTtcbiAgY29uc3QgW2FjdGl2ZVRhYiwgc2V0QWN0aXZlVGFiXSA9IHVzZVN0YXRlKCdyZXZpZXcnKTtcbiAgY29uc3Qgc2VjdGlvblJlZnMgPSB1c2VSZWYoe30pO1xuXG4gIGNvbnN0IHByb2plY3RzID0gW1xuICAgIHtcbiAgICAgIHRpdGxlOiBcIlF1aXp6ZXNcIixcbiAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICBcIlByZSBidWlsdCBxdWl6emVzIHRvIGhlbHAgeW91IHRlc3QgeW91ciBrbm93bGVkZ2Ugb24gdmFyaW91cyB0b3BpY3MuXCIsXG4gICAgICBsaW5rOiBgL2Rhc2hib2FyZC8ke3dvcmtzcGFjZWlkfS9yZXZpZXcvZmxhc2hjYXJkcy80NTZgLFxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6IFwiRmxhc2hjYXJkc1wiLFxuICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgIFwiRmxhc2hjYXJkcyB0byBoZWxwIHlvdSBtZW1vcml6ZSBpbXBvcnRhbnQgY29uY2VwdHMgYW5kIHRlcm1zLlwiLFxuICAgICAgbGluazogYC9kYXNoYm9hcmQvJHt3b3Jrc3BhY2VpZH0vcmV2aWV3L2ZsYXNoY2FyZHMvMTIzYCxcbiAgICB9LFxuICBdO1xuXG4gIGNvbnN0IGhhbmRsZU5hdmlnYXRpb24gPSAodG9waWMpID0+IHtcbiAgICBzZXRBY3RpdmVTZWN0aW9uKHRvcGljKTtcbiAgICByb3V0ZXIucHVzaChgL2Rhc2hib2FyZC8ke3dvcmtzcGFjZWlkfS8ke3RvcGljfWApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVRhYkNoYW5nZSA9ICh0YWIpID0+IHtcbiAgICBzZXRBY3RpdmVUYWIodGFiKTtcbiAgICBpZiAodGFiID09PSAnb3ZlcnZpZXcnKSB7XG4gICAgICByb3V0ZXIucHVzaChgL2Rhc2hib2FyZC8ke3dvcmtzcGFjZWlkfS9pbnRyb2R1Y3Rpb25gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcm91dGVyLnB1c2goYC9kYXNoYm9hcmQvJHt3b3Jrc3BhY2VpZH0vJHt0YWJ9YCk7XG4gICAgfVxuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IHNlY3Rpb25SZWZzLmN1cnJlbnRbdG9waWNpZF07XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcgfSk7XG4gICAgfVxuICB9LCBbdG9waWNpZF0pO1xuXG4gIHJldHVybiAoXG4gICAgPFRoZW1lUHJvdmlkZXI+XG4gICAgICA8V29ya3NwYWNlTmF2YmFyIHdvcmtzcGFjZWlkPXt3b3Jrc3BhY2VpZH0gLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBoLXNjcmVlblwiPlxuICAgICAgICB7LyogUmlnaHQ6IENvbnRlbnQgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1zY3JlZW4gcHktWzY0cHhdIG92ZXJmbG93LXktYXV0b1wiPlxuICAgICAgICAgIHsvKiBUYWJzICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBweC04IG1iLTggc3RpY2t5IHRvcC1bLTEwcHhdIHotMTAgYmctd2hpdGUgZGFyazpiZy1uZXV0cmFsLTkwMCBwLTIgc2hhZG93LW1kXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVRhYkNoYW5nZSgnb3ZlcnZpZXcnKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC00ICR7YWN0aXZlVGFiID09PSAnb3ZlcnZpZXcnID8gJ2JvcmRlci1iLTIgYm9yZGVyLWJsdWUtNTAwIGZvbnQtc2VtaWJvbGQnIDogJyd9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgT3ZlcnZpZXdcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVUYWJDaGFuZ2UoJ3JldmlldycpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTQgJHthY3RpdmVUYWIgPT09ICdyZXZpZXcnID8gJ2JvcmRlci1iLTIgYm9yZGVyLWJsdWUtNTAwIGZvbnQtc2VtaWJvbGQnIDogJyd9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgUmV2aWV3XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlVGFiQ2hhbmdlKCdtaW5kbWFwJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtNCAke2FjdGl2ZVRhYiA9PT0gJ21pbmRtYXAnID8gJ2JvcmRlci1iLTIgYm9yZGVyLWJsdWUtNTAwIGZvbnQtc2VtaWJvbGQnIDogJyd9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgTWluZG1hcFxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogUXVpeiBDYXJkczogVGhyZWUgcGVyIFJvdyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTV4bCBteC1hdXRvIHB4LThcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAganVzdGlmeS1iZXR3ZWVuIHNwYWNlLXktNFwiPlxuICAgICAgICAgIFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtZDp3LTEvMyBweC0yXCI+XG4gICAgICAgICAgICAgICAgPFF1aXpDYXJkIHRleHQ9XCJRdWl6IENhcmRcIiBkZXNjcmlwdGlvbj1cIlRoaXMgaXMgYSBxdWl6IGNhcmRcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWQ6dy0xLzMgcHgtMlwiPlxuICAgICAgICAgICAgICAgIDxRdWl6Q2FyZCB0ZXh0PVwiUXVpeiBDYXJkXCIgZGVzY3JpcHRpb249XCJUaGlzIGlzIGEgcXVpeiBjYXJkXCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1kOnctMS8zIHB4LTJcIj5cbiAgICAgICAgICAgICAgICA8UXVpekNhcmQgdGV4dD1cIlF1aXogQ2FyZFwiIGRlc2NyaXB0aW9uPVwiVGhpcyBpcyBhIHF1aXogY2FyZFwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtZDp3LTEvMyBweC0yXCI+XG4gICAgICAgICAgICAgICAgPFF1aXpDYXJkIHRleHQ9XCJRdWl6IENhcmRcIiBkZXNjcmlwdGlvbj1cIlRoaXMgaXMgYSBxdWl6IGNhcmRcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWQ6dy0xLzMgcHgtMlwiPlxuICAgICAgICAgICAgICAgIDxRdWl6Q2FyZCB0ZXh0PVwiUXVpeiBDYXJkXCIgZGVzY3JpcHRpb249XCJUaGlzIGlzIGEgcXVpeiBjYXJkXCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1kOnctMS8zIHB4LTJcIj5cbiAgICAgICAgICAgICAgICA8UXVpekNhcmQgdGV4dD1cIlF1aXogQ2FyZFwiIGRlc2NyaXB0aW9uPVwiVGhpcyBpcyBhIHF1aXogY2FyZFwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtZDp3LTEvMyBweC0yXCI+XG4gICAgICAgICAgICAgICAgPFF1aXpDYXJkIHRleHQ9XCJRdWl6IENhcmRcIiBkZXNjcmlwdGlvbj1cIlRoaXMgaXMgYSBxdWl6IGNhcmRcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWQ6dy0xLzMgcHgtMlwiPlxuICAgICAgICAgICAgICAgIDxRdWl6Q2FyZCB0ZXh0PVwiUXVpeiBDYXJkXCIgZGVzY3JpcHRpb249XCJUaGlzIGlzIGEgcXVpeiBjYXJkXCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L1RoZW1lUHJvdmlkZXI+XG4gICk7XG59XG4iXSwibmFtZXMiOlsiUXVpekNhcmQiLCJXb3Jrc3BhY2VOYXZiYXIiLCJUaGVtZVByb3ZpZGVyIiwidXNlUGFyYW1zIiwidXNlUm91dGVyIiwidXNlRWZmZWN0IiwidXNlUmVmIiwidXNlU3RhdGUiLCJ0b3BpY3MiLCJpZCIsInRpdGxlIiwiYm9keSIsInR5cGUiLCJjb250ZW50Iiwic3JjIiwiV29ya3NwYWNlUGFnZSIsInJvdXRlciIsIndvcmtzcGFjZWlkIiwidG9waWNpZCIsImFjdGl2ZVNlY3Rpb24iLCJzZXRBY3RpdmVTZWN0aW9uIiwiYWN0aXZlVGFiIiwic2V0QWN0aXZlVGFiIiwic2VjdGlvblJlZnMiLCJwcm9qZWN0cyIsImRlc2NyaXB0aW9uIiwibGluayIsImhhbmRsZU5hdmlnYXRpb24iLCJ0b3BpYyIsInB1c2giLCJoYW5kbGVUYWJDaGFuZ2UiLCJ0YWIiLCJlbGVtZW50IiwiY3VycmVudCIsInNjcm9sbEludG9WaWV3IiwiYmVoYXZpb3IiLCJkaXYiLCJjbGFzc05hbWUiLCJidXR0b24iLCJvbkNsaWNrIiwidGV4dCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/dashboard/[workspaceid]/review/quiz/page.js\n"));

/***/ })

});