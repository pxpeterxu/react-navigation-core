var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _objectSpread2=_interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));var _getChildEventSubscriber=_interopRequireDefault(require("../getChildEventSubscriber"));it('child action events only flow when focused',function(){var parentSubscriber=jest.fn();var emitParentAction=function emitParentAction(payload){parentSubscriber.mock.calls.forEach(function(subs){if(subs[0]===payload.type){subs[1](payload);}});};var subscriptionRemove=function subscriptionRemove(){};parentSubscriber.mockReturnValueOnce({remove:subscriptionRemove});var childEventSubscriber=(0,_getChildEventSubscriber.default)(parentSubscriber,'key1').addListener;var testState={key:'foo',routeName:'FooRoute',routes:[{key:'key0'},{key:'key1'}],index:0,isTransitioning:false};var focusedTestState=(0,_objectSpread2.default)({},testState,{index:1});var childActionHandler=jest.fn();var childWillFocusHandler=jest.fn();var childDidFocusHandler=jest.fn();childEventSubscriber('action',childActionHandler);childEventSubscriber('willFocus',childWillFocusHandler);childEventSubscriber('didFocus',childDidFocusHandler);emitParentAction({type:'action',state:focusedTestState,lastState:testState,action:{type:'FooAction'}});expect(childActionHandler.mock.calls.length).toBe(0);expect(childWillFocusHandler.mock.calls.length).toBe(1);expect(childDidFocusHandler.mock.calls.length).toBe(1);emitParentAction({type:'action',state:focusedTestState,lastState:focusedTestState,action:{type:'FooAction'}});expect(childActionHandler.mock.calls.length).toBe(1);expect(childWillFocusHandler.mock.calls.length).toBe(1);expect(childDidFocusHandler.mock.calls.length).toBe(1);});it('grandchildren subscription',function(){var grandParentSubscriber=jest.fn();var emitGrandParentAction=function emitGrandParentAction(payload){grandParentSubscriber.mock.calls.forEach(function(subs){if(subs[0]===payload.type){subs[1](payload);}});};var subscriptionRemove=function subscriptionRemove(){};grandParentSubscriber.mockReturnValueOnce({remove:subscriptionRemove});var parentSubscriber=(0,_getChildEventSubscriber.default)(grandParentSubscriber,'parent').addListener;var childEventSubscriber=(0,_getChildEventSubscriber.default)(parentSubscriber,'key1').addListener;var parentBlurState={key:'foo',routeName:'FooRoute',routes:[{key:'aunt'},{key:'parent',routes:[{key:'key0'},{key:'key1'}],index:1,isTransitioning:false}],index:0,isTransitioning:false};var parentTransitionState=(0,_objectSpread2.default)({},parentBlurState,{index:1,isTransitioning:true});var parentFocusState=(0,_objectSpread2.default)({},parentTransitionState,{isTransitioning:false});var childActionHandler=jest.fn();var childWillFocusHandler=jest.fn();var childDidFocusHandler=jest.fn();childEventSubscriber('action',childActionHandler);childEventSubscriber('willFocus',childWillFocusHandler);childEventSubscriber('didFocus',childDidFocusHandler);emitGrandParentAction({type:'action',state:parentTransitionState,lastState:parentBlurState,action:{type:'FooAction'}});expect(childActionHandler.mock.calls.length).toBe(0);expect(childWillFocusHandler.mock.calls.length).toBe(1);expect(childDidFocusHandler.mock.calls.length).toBe(0);emitGrandParentAction({type:'action',state:parentFocusState,lastState:parentTransitionState,action:{type:'FooAction'}});expect(childActionHandler.mock.calls.length).toBe(0);expect(childWillFocusHandler.mock.calls.length).toBe(1);expect(childDidFocusHandler.mock.calls.length).toBe(1);});it('grandchildren transitions',function(){var grandParentSubscriber=jest.fn();var emitGrandParentAction=function emitGrandParentAction(payload){grandParentSubscriber.mock.calls.forEach(function(subs){if(subs[0]===payload.type){subs[1](payload);}});};var subscriptionRemove=function subscriptionRemove(){};grandParentSubscriber.mockReturnValueOnce({remove:subscriptionRemove});var parentSubscriber=(0,_getChildEventSubscriber.default)(grandParentSubscriber,'parent').addListener;var childEventSubscriber=(0,_getChildEventSubscriber.default)(parentSubscriber,'key1').addListener;var makeFakeState=function makeFakeState(childIndex,childIsTransitioning){return{index:1,isTransitioning:false,routes:[{key:'nothing'},{key:'parent',index:childIndex,isTransitioning:childIsTransitioning,routes:[{key:'key0'},{key:'key1'},{key:'key2'}]}]};};var blurredState=makeFakeState(0,false);var transitionState=makeFakeState(1,true);var focusState=makeFakeState(1,false);var transition2State=makeFakeState(2,true);var blurred2State=makeFakeState(2,false);var childActionHandler=jest.fn();var childWillFocusHandler=jest.fn();var childDidFocusHandler=jest.fn();var childWillBlurHandler=jest.fn();var childDidBlurHandler=jest.fn();childEventSubscriber('action',childActionHandler);childEventSubscriber('willFocus',childWillFocusHandler);childEventSubscriber('didFocus',childDidFocusHandler);childEventSubscriber('willBlur',childWillBlurHandler);childEventSubscriber('didBlur',childDidBlurHandler);emitGrandParentAction({type:'action',state:transitionState,lastState:blurredState,action:{type:'FooAction'}});expect(childActionHandler.mock.calls.length).toBe(0);expect(childWillFocusHandler.mock.calls.length).toBe(1);expect(childDidFocusHandler.mock.calls.length).toBe(0);emitGrandParentAction({type:'action',state:focusState,lastState:transitionState,action:{type:'FooAction'}});expect(childActionHandler.mock.calls.length).toBe(0);expect(childWillFocusHandler.mock.calls.length).toBe(1);expect(childDidFocusHandler.mock.calls.length).toBe(1);emitGrandParentAction({type:'action',state:focusState,lastState:focusState,action:{type:'TestAction'}});expect(childWillFocusHandler.mock.calls.length).toBe(1);expect(childDidFocusHandler.mock.calls.length).toBe(1);expect(childActionHandler.mock.calls.length).toBe(1);emitGrandParentAction({type:'action',state:transition2State,lastState:focusState,action:{type:'CauseWillBlurAction'}});expect(childWillBlurHandler.mock.calls.length).toBe(1);expect(childDidBlurHandler.mock.calls.length).toBe(0);expect(childActionHandler.mock.calls.length).toBe(1);emitGrandParentAction({type:'action',state:blurred2State,lastState:transition2State,action:{type:'CauseDidBlurAction'}});expect(childWillBlurHandler.mock.calls.length).toBe(1);expect(childDidBlurHandler.mock.calls.length).toBe(1);expect(childActionHandler.mock.calls.length).toBe(1);});it('grandchildren pass through transitions',function(){var grandParentSubscriber=jest.fn();var emitGrandParentAction=function emitGrandParentAction(payload){grandParentSubscriber.mock.calls.forEach(function(subs){if(subs[0]===payload.type){subs[1](payload);}});};var subscriptionRemove=function subscriptionRemove(){};grandParentSubscriber.mockReturnValueOnce({remove:subscriptionRemove});var parentSubscriber=(0,_getChildEventSubscriber.default)(grandParentSubscriber,'parent').addListener;var childEventSubscriber=(0,_getChildEventSubscriber.default)(parentSubscriber,'key1').addListener;var makeFakeState=function makeFakeState(childIndex,childIsTransitioning){return{index:childIndex,isTransitioning:childIsTransitioning,routes:[{key:'nothing'},{key:'parent',index:1,isTransitioning:false,routes:[{key:'key0'},{key:'key1'},{key:'key2'}]}].slice(0,childIndex+1)};};var blurredState=makeFakeState(0,false);var transitionState=makeFakeState(1,true);var focusState=makeFakeState(1,false);var transition2State=makeFakeState(0,true);var blurred2State=makeFakeState(0,false);var childActionHandler=jest.fn();var childWillFocusHandler=jest.fn();var childDidFocusHandler=jest.fn();var childWillBlurHandler=jest.fn();var childDidBlurHandler=jest.fn();childEventSubscriber('action',childActionHandler);childEventSubscriber('willFocus',childWillFocusHandler);childEventSubscriber('didFocus',childDidFocusHandler);childEventSubscriber('willBlur',childWillBlurHandler);childEventSubscriber('didBlur',childDidBlurHandler);emitGrandParentAction({type:'action',state:transitionState,lastState:blurredState,action:{type:'FooAction'}});expect(childActionHandler.mock.calls.length).toBe(0);expect(childWillFocusHandler.mock.calls.length).toBe(1);expect(childDidFocusHandler.mock.calls.length).toBe(0);emitGrandParentAction({type:'action',state:focusState,lastState:transitionState,action:{type:'FooAction'}});expect(childActionHandler.mock.calls.length).toBe(0);expect(childWillFocusHandler.mock.calls.length).toBe(1);expect(childDidFocusHandler.mock.calls.length).toBe(1);emitGrandParentAction({type:'action',state:focusState,lastState:focusState,action:{type:'TestAction'}});expect(childWillFocusHandler.mock.calls.length).toBe(1);expect(childDidFocusHandler.mock.calls.length).toBe(1);expect(childActionHandler.mock.calls.length).toBe(1);emitGrandParentAction({type:'action',state:transition2State,lastState:focusState,action:{type:'CauseWillBlurAction'}});expect(childWillBlurHandler.mock.calls.length).toBe(1);expect(childDidBlurHandler.mock.calls.length).toBe(0);expect(childActionHandler.mock.calls.length).toBe(1);emitGrandParentAction({type:'action',state:blurred2State,lastState:transition2State,action:{type:'CauseDidBlurAction'}});expect(childWillBlurHandler.mock.calls.length).toBe(1);expect(childDidBlurHandler.mock.calls.length).toBe(1);expect(childActionHandler.mock.calls.length).toBe(1);});it('child focus with transition',function(){var parentSubscriber=jest.fn();var emitParentAction=function emitParentAction(payload){parentSubscriber.mock.calls.forEach(function(subs){if(subs[0]===payload.type){subs[1](payload);}});};var subscriptionRemove=function subscriptionRemove(){};parentSubscriber.mockReturnValueOnce({remove:subscriptionRemove});var childEventSubscriber=(0,_getChildEventSubscriber.default)(parentSubscriber,'key1').addListener;var randomAction={type:'FooAction'};var testState={key:'foo',routeName:'FooRoute',routes:[{key:'key0'},{key:'key1'}],index:0,isTransitioning:false};var childWillFocusHandler=jest.fn();var childDidFocusHandler=jest.fn();var childWillBlurHandler=jest.fn();var childDidBlurHandler=jest.fn();childEventSubscriber('willFocus',childWillFocusHandler);childEventSubscriber('didFocus',childDidFocusHandler);childEventSubscriber('willBlur',childWillBlurHandler);childEventSubscriber('didBlur',childDidBlurHandler);emitParentAction({type:'didFocus',action:randomAction,lastState:testState,state:testState});emitParentAction({type:'action',action:randomAction,lastState:testState,state:(0,_objectSpread2.default)({},testState,{index:1,isTransitioning:true})});expect(childWillFocusHandler.mock.calls.length).toBe(1);emitParentAction({type:'action',action:randomAction,lastState:(0,_objectSpread2.default)({},testState,{index:1,isTransitioning:true}),state:(0,_objectSpread2.default)({},testState,{index:1,isTransitioning:false})});expect(childDidFocusHandler.mock.calls.length).toBe(1);emitParentAction({type:'action',action:randomAction,lastState:(0,_objectSpread2.default)({},testState,{index:1,isTransitioning:false}),state:(0,_objectSpread2.default)({},testState,{index:0,isTransitioning:true})});expect(childWillBlurHandler.mock.calls.length).toBe(1);emitParentAction({type:'action',action:randomAction,lastState:(0,_objectSpread2.default)({},testState,{index:0,isTransitioning:true}),state:(0,_objectSpread2.default)({},testState,{index:0,isTransitioning:false})});expect(childDidBlurHandler.mock.calls.length).toBe(1);});it('child focus with immediate transition',function(){var parentSubscriber=jest.fn();var emitParentAction=function emitParentAction(payload){parentSubscriber.mock.calls.forEach(function(subs){if(subs[0]===payload.type){subs[1](payload);}});};var subscriptionRemove=function subscriptionRemove(){};parentSubscriber.mockReturnValueOnce({remove:subscriptionRemove});var childEventSubscriber=(0,_getChildEventSubscriber.default)(parentSubscriber,'key1').addListener;var randomAction={type:'FooAction'};var testState={key:'foo',routeName:'FooRoute',routes:[{key:'key0'},{key:'key1'}],index:0,isTransitioning:false};var childWillFocusHandler=jest.fn();var childDidFocusHandler=jest.fn();var childWillBlurHandler=jest.fn();var childDidBlurHandler=jest.fn();childEventSubscriber('willFocus',childWillFocusHandler);childEventSubscriber('didFocus',childDidFocusHandler);childEventSubscriber('willBlur',childWillBlurHandler);childEventSubscriber('didBlur',childDidBlurHandler);emitParentAction({type:'didFocus',action:randomAction,lastState:testState,state:testState});emitParentAction({type:'action',action:randomAction,lastState:testState,state:(0,_objectSpread2.default)({},testState,{index:1})});expect(childWillFocusHandler.mock.calls.length).toBe(1);expect(childDidFocusHandler.mock.calls.length).toBe(1);emitParentAction({type:'action',action:randomAction,lastState:(0,_objectSpread2.default)({},testState,{index:1}),state:(0,_objectSpread2.default)({},testState,{index:0})});expect(childWillBlurHandler.mock.calls.length).toBe(1);expect(childDidBlurHandler.mock.calls.length).toBe(1);});var setupEventTest=function setupEventTest(subscriptionKey,initialLastFocusEvent){var parentSubscriber=jest.fn();var emitEvent=function emitEvent(payload){parentSubscriber.mock.calls.forEach(function(subs){if(subs[0]===payload.type){subs[1](payload);}});};var subscriptionRemove=function subscriptionRemove(){};parentSubscriber.mockReturnValueOnce({remove:subscriptionRemove});var evtProvider=(0,_getChildEventSubscriber.default)(parentSubscriber,subscriptionKey,initialLastFocusEvent);var handlers={};evtProvider.addListener('action',handlers.action=jest.fn());evtProvider.addListener('willFocus',handlers.willFocus=jest.fn());evtProvider.addListener('didFocus',handlers.didFocus=jest.fn());evtProvider.addListener('willBlur',handlers.willBlur=jest.fn());evtProvider.addListener('didBlur',handlers.didBlur=jest.fn());return{emitEvent:emitEvent,handlers:handlers,evtProvider:evtProvider};};it('immediate back with uncompleted transition will focus first screen again',function(){var _setupEventTest=setupEventTest('key0','didFocus'),handlers=_setupEventTest.handlers,emitEvent=_setupEventTest.emitEvent;emitEvent({type:'action',state:{index:1,routes:[{key:'key0'},{key:'key1'}],isTransitioning:true},lastState:{index:0,routes:[{key:'key0'}],isTransitioning:false},action:{type:'Any action, does not matter here'}});expect(handlers.willFocus.mock.calls.length).toBe(0);expect(handlers.didFocus.mock.calls.length).toBe(0);expect(handlers.willBlur.mock.calls.length).toBe(1);expect(handlers.didBlur.mock.calls.length).toBe(0);emitEvent({type:'action',state:{index:0,routes:[{key:'key0'}],isTransitioning:true},lastState:{index:1,routes:[{key:'key0'},{key:'key1'}],isTransitioning:true},action:{type:'Any action, does not matter here'}});expect(handlers.willFocus.mock.calls.length).toBe(1);expect(handlers.didFocus.mock.calls.length).toBe(0);expect(handlers.willBlur.mock.calls.length).toBe(1);expect(handlers.didBlur.mock.calls.length).toBe(0);emitEvent({type:'action',state:{index:0,routes:[{key:'key0'}],isTransitioning:false},lastState:{index:0,routes:[{key:'key0'}],isTransitioning:true},action:{type:'Any action, does not matter here'}});expect(handlers.willFocus.mock.calls.length).toBe(1);expect(handlers.didFocus.mock.calls.length).toBe(1);expect(handlers.willBlur.mock.calls.length).toBe(1);expect(handlers.didBlur.mock.calls.length).toBe(0);});
//# sourceMappingURL=getChildEventSubscriber-test.js.map