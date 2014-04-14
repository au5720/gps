// Compiled by ClojureScript 0.0-2156
goog.provide('gps.core');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('goog.events');
goog.require('cljs.reader');
goog.require('goog.dom');
goog.require('om.dom');
goog.require('om.core');
goog.require('goog.net.XhrIo');
goog.require('goog.dom');
goog.require('om.core');
goog.require('om.dom');
goog.require('cljs.reader');
goog.require('goog.events.EventType');
goog.require('cljs.core.async');
goog.require('goog.events');
cljs.core.enable_console_print_BANG_.call(null);
gps.core.meths = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"get","get",1014006472),"GET",new cljs.core.Keyword(null,"put","put",1014015617),"PUT",new cljs.core.Keyword(null,"post","post",1017351186),"POST",new cljs.core.Keyword(null,"delete","delete",3973413149),"DELETE"], null);
gps.core.edn_xhr = (function edn_xhr(p__111400){var map__111402 = p__111400;var map__111402__$1 = ((cljs.core.seq_QMARK_.call(null,map__111402))?cljs.core.apply.call(null,cljs.core.hash_map,map__111402):map__111402);var on_complete = cljs.core.get.call(null,map__111402__$1,new cljs.core.Keyword(null,"on-complete","on-complete",2943599833));var data = cljs.core.get.call(null,map__111402__$1,new cljs.core.Keyword(null,"data","data",1016980252));var url = cljs.core.get.call(null,map__111402__$1,new cljs.core.Keyword(null,"url","url",1014020321));var method = cljs.core.get.call(null,map__111402__$1,new cljs.core.Keyword(null,"method","method",4231316563));var xhr = (new goog.net.XhrIo());goog.events.listen(xhr,goog.net.EventType.COMPLETE,(function (e){return on_complete.call(null,cljs.reader.read_string.call(null,xhr.getResponseText()));
}));
return xhr.send(url,gps.core.meths.call(null,method),(cljs.core.truth_(data)?cljs.core.pr_str.call(null,data):null),{"Content-Type": "application/edn"});
});
gps.core.app_state = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"classes","classes",1867525016),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"deals","deals",1109361913),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"coord","coord",1108749927),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"lon","lon",1014011581),53.345009999999995,new cljs.core.Keyword(null,"lat","lat",1014011153),-6.2613717,new cljs.core.Keyword(null,"radius","radius",4370292740),3], null)], null));
gps.core.deal_view = (function deal_view(deal,owner){if(typeof gps.core.t111406 !== 'undefined')
{} else
{
/**
* @constructor
*/
gps.core.t111406 = (function (owner,deal,deal_view,meta111407){
this.owner = owner;
this.deal = deal;
this.deal_view = deal_view;
this.meta111407 = meta111407;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
gps.core.t111406.cljs$lang$type = true;
gps.core.t111406.cljs$lang$ctorStr = "gps.core/t111406";
gps.core.t111406.cljs$lang$ctorPrWriter = (function (this__3970__auto__,writer__3971__auto__,opt__3972__auto__){return cljs.core._write.call(null,writer__3971__auto__,"gps.core/t111406");
});
gps.core.t111406.prototype.om$core$IRender$ = true;
gps.core.t111406.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return React.DOM.li(null,React.DOM.div(null,React.DOM.div(null,new cljs.core.Keyword("location","geocode","location/geocode",4683881930).cljs$core$IFn$_invoke$arity$1(self__.deal)),React.DOM.div(null,new cljs.core.Keyword("location","lat","location/lat",4789037289).cljs$core$IFn$_invoke$arity$1(self__.deal)),React.DOM.div(null,new cljs.core.Keyword("location","lon","location/lon",4789036861).cljs$core$IFn$_invoke$arity$1(self__.deal)),React.DOM.div(null,new cljs.core.Keyword("vendor","name","vendor/name",888980631).cljs$core$IFn$_invoke$arity$1(self__.deal)),React.DOM.div(null,new cljs.core.Keyword("vendor","deal","vendor/deal",889277944).cljs$core$IFn$_invoke$arity$1(self__.deal))));
});
gps.core.t111406.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_111408){var self__ = this;
var _111408__$1 = this;return self__.meta111407;
});
gps.core.t111406.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_111408,meta111407__$1){var self__ = this;
var _111408__$1 = this;return (new gps.core.t111406(self__.owner,self__.deal,self__.deal_view,meta111407__$1));
});
gps.core.__GT_t111406 = (function __GT_t111406(owner__$1,deal__$1,deal_view__$1,meta111407){return (new gps.core.t111406(owner__$1,deal__$1,deal_view__$1,meta111407));
});
}
return (new gps.core.t111406(owner,deal,deal_view,null));
});
gps.core.get_deals = (function get_deals(lat,lon,radius,f){return gps.core.edn_xhr.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472),new cljs.core.Keyword(null,"url","url",1014020321),[cljs.core.str("deals/"),cljs.core.str(lat),cljs.core.str("/"),cljs.core.str(lon),cljs.core.str("/"),cljs.core.str(radius)].join(''),new cljs.core.Keyword(null,"on-complete","on-complete",2943599833),f], null));
});
gps.core.save_coord = (function save_coord(e,owner){var ch = om.core.get_state.call(null,owner,new cljs.core.Keyword(null,"coord-chan","coord-chan",1157103260));return navigator.geolocation.getCurrentPosition((function (position){try{var lon = position.coords.longitude;var lat = position.coords.latitude;var radius = cljs.core.rand_int.call(null,10);var new_coord = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"lon","lon",1014011581),lon,new cljs.core.Keyword(null,"lat","lat",1014011153),lat,new cljs.core.Keyword(null,"radius","radius",4370292740),radius], null);cljs.core.println.call(null,new_coord);
cljs.core.println.call(null,lon);
cljs.core.println.call(null,lat);
cljs.core.println.call(null,radius);
cljs.core.swap_BANG_.call(null,gps.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"coord","coord",1108749927),new_coord);
cljs.core.swap_BANG_.call(null,gps.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"deals","deals",1109361913),cljs.core.PersistentVector.EMPTY);
return cljs.core.async.put_BANG_.call(null,ch,new_coord);
}catch (e111410){if((e111410 instanceof Object))
{var e__$1 = e111410;return cljs.core.println.call(null,e__$1);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e111410;
} else
{return null;
}
}
}}),(function (error){var errcode = error.code;if(cljs.core._EQ_.call(null,errcode,1))
{return cljs.core.println.call(null,"The user has denied you access to their location");
} else
{if(cljs.core._EQ_.call(null,errcode,2))
{return cljs.core.println.call(null,"The network is down");
} else
{if(cljs.core._EQ_.call(null,errcode,3))
{return cljs.core.println.call(null,"It took too long to calculate the user\u2019s position");
} else
{return null;
}
}
}
}));
});
gps.core.lon_lat_view = (function lon_lat_view(app,owner){if(typeof gps.core.t111415 !== 'undefined')
{} else
{
/**
* @constructor
*/
gps.core.t111415 = (function (owner,app,lon_lat_view,meta111416){
this.owner = owner;
this.app = app;
this.lon_lat_view = lon_lat_view;
this.meta111416 = meta111416;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
gps.core.t111415.cljs$lang$type = true;
gps.core.t111415.cljs$lang$ctorStr = "gps.core/t111415";
gps.core.t111415.cljs$lang$ctorPrWriter = (function (this__3970__auto__,writer__3971__auto__,opt__3972__auto__){return cljs.core._write.call(null,writer__3971__auto__,"gps.core/t111415");
});
gps.core.t111415.prototype.om$core$IRender$ = true;
gps.core.t111415.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;var map__111418 = new cljs.core.Keyword(null,"coord","coord",1108749927).cljs$core$IFn$_invoke$arity$1(self__.app);var map__111418__$1 = ((cljs.core.seq_QMARK_.call(null,map__111418))?cljs.core.apply.call(null,cljs.core.hash_map,map__111418):map__111418);var radius = cljs.core.get.call(null,map__111418__$1,new cljs.core.Keyword(null,"radius","radius",4370292740));var lat = cljs.core.get.call(null,map__111418__$1,new cljs.core.Keyword(null,"lat","lat",1014011153));var lon = cljs.core.get.call(null,map__111418__$1,new cljs.core.Keyword(null,"lon","lon",1014011581));return React.DOM.div(null,React.DOM.span(null,[cljs.core.str("lon "),cljs.core.str(lon),cljs.core.str(" lat "),cljs.core.str(lat),cljs.core.str(" radius "),cljs.core.str(radius)].join('')));
});
gps.core.t111415.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_111417){var self__ = this;
var _111417__$1 = this;return self__.meta111416;
});
gps.core.t111415.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_111417,meta111416__$1){var self__ = this;
var _111417__$1 = this;return (new gps.core.t111415(self__.owner,self__.app,self__.lon_lat_view,meta111416__$1));
});
gps.core.__GT_t111415 = (function __GT_t111415(owner__$1,app__$1,lon_lat_view__$1,meta111416){return (new gps.core.t111415(owner__$1,app__$1,lon_lat_view__$1,meta111416));
});
}
return (new gps.core.t111415(owner,app,lon_lat_view,null));
});
gps.core.deals_view = (function deals_view(app,owner){if(typeof gps.core.t111448 !== 'undefined')
{} else
{
/**
* @constructor
*/
gps.core.t111448 = (function (owner,app,deals_view,meta111449){
this.owner = owner;
this.app = app;
this.deals_view = deals_view;
this.meta111449 = meta111449;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
gps.core.t111448.cljs$lang$type = true;
gps.core.t111448.cljs$lang$ctorStr = "gps.core/t111448";
gps.core.t111448.cljs$lang$ctorPrWriter = (function (this__3970__auto__,writer__3971__auto__,opt__3972__auto__){return cljs.core._write.call(null,writer__3971__auto__,"gps.core/t111448");
});
gps.core.t111448.prototype.om$core$IRenderState$ = true;
gps.core.t111448.prototype.om$core$IRenderState$render_state$arity$2 = (function (_,state){var self__ = this;
var ___$1 = this;return React.DOM.div({"id": "deals"},React.DOM.h2(null,"Deals"),cljs.core.println.call(null,new cljs.core.Keyword(null,"coord","coord",1108749927).cljs$core$IFn$_invoke$arity$1(self__.app)),React.DOM.button({"onClick": (function (p1__111420_SHARP_){return gps.core.save_coord.call(null,p1__111420_SHARP_,self__.owner);
})},"Refresh"),cljs.core.apply.call(null,om.dom.ul,null,om.core.build_all.call(null,gps.core.deal_view,new cljs.core.Keyword(null,"deals","deals",1109361913).cljs$core$IFn$_invoke$arity$1(self__.app))));
});
gps.core.t111448.prototype.om$core$IWillMount$ = true;
gps.core.t111448.prototype.om$core$IWillMount$will_mount$arity$1 = (function (_){var self__ = this;
var ___$1 = this;var ch = om.core.get_state.call(null,self__.owner,new cljs.core.Keyword(null,"coord-chan","coord-chan",1157103260));var c__85790__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__85791__auto__ = (function (){var switch__85775__auto__ = (function (state_111463){var state_val_111464 = (state_111463[1]);if((state_val_111464 === 4))
{var inst_111453 = (state_111463[2]);var inst_111454 = new cljs.core.Keyword(null,"lon","lon",1014011581).cljs$core$IFn$_invoke$arity$1(inst_111453);var inst_111455 = new cljs.core.Keyword(null,"lat","lat",1014011153).cljs$core$IFn$_invoke$arity$1(inst_111453);var inst_111456 = new cljs.core.Keyword(null,"radius","radius",4370292740).cljs$core$IFn$_invoke$arity$1(inst_111453);var inst_111457 = (function (){var radius = inst_111456;var lat = inst_111455;var lon = inst_111454;var coord_update = inst_111453;return ((function (radius,lat,lon,coord_update,inst_111453,inst_111454,inst_111455,inst_111456,state_val_111464){
return (function (p1__111419_SHARP_){return om.core.transact_BANG_.call(null,self__.app,new cljs.core.Keyword(null,"deals","deals",1109361913),((function (radius,lat,lon,coord_update,inst_111453,inst_111454,inst_111455,inst_111456,state_val_111464){
return (function (___$2){return p1__111419_SHARP_;
});})(radius,lat,lon,coord_update,inst_111453,inst_111454,inst_111455,inst_111456,state_val_111464))
);
});
;})(radius,lat,lon,coord_update,inst_111453,inst_111454,inst_111455,inst_111456,state_val_111464))
})();var inst_111458 = gps.core.get_deals.call(null,inst_111455,inst_111454,inst_111456,inst_111457);var state_111463__$1 = (function (){var statearr_111465 = state_111463;(statearr_111465[7] = inst_111458);
return statearr_111465;
})();var statearr_111466_111475 = state_111463__$1;(statearr_111466_111475[2] = null);
(statearr_111466_111475[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_111464 === 3))
{var inst_111461 = (state_111463[2]);var state_111463__$1 = state_111463;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_111463__$1,inst_111461);
} else
{if((state_val_111464 === 2))
{var state_111463__$1 = state_111463;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_111463__$1,4,ch);
} else
{if((state_val_111464 === 1))
{var state_111463__$1 = state_111463;var statearr_111467_111476 = state_111463__$1;(statearr_111467_111476[2] = null);
(statearr_111467_111476[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
});return ((function (switch__85775__auto__){
return (function() {
var state_machine__85776__auto__ = null;
var state_machine__85776__auto____0 = (function (){var statearr_111471 = [null,null,null,null,null,null,null,null];(statearr_111471[0] = state_machine__85776__auto__);
(statearr_111471[1] = 1);
return statearr_111471;
});
var state_machine__85776__auto____1 = (function (state_111463){while(true){
var ret_value__85777__auto__ = (function (){try{while(true){
var result__85778__auto__ = switch__85775__auto__.call(null,state_111463);if(cljs.core.keyword_identical_QMARK_.call(null,result__85778__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__85778__auto__;
}
break;
}
}catch (e111472){if((e111472 instanceof Object))
{var ex__85779__auto__ = e111472;var statearr_111473_111477 = state_111463;(statearr_111473_111477[5] = ex__85779__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_111463);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e111472;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__85777__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__111478 = state_111463;
state_111463 = G__111478;
continue;
}
} else
{return ret_value__85777__auto__;
}
break;
}
});
state_machine__85776__auto__ = function(state_111463){
switch(arguments.length){
case 0:
return state_machine__85776__auto____0.call(this);
case 1:
return state_machine__85776__auto____1.call(this,state_111463);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__85776__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__85776__auto____0;
state_machine__85776__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__85776__auto____1;
return state_machine__85776__auto__;
})()
;})(switch__85775__auto__))
})();var state__85792__auto__ = (function (){var statearr_111474 = f__85791__auto__.call(null);(statearr_111474[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__85790__auto__);
return statearr_111474;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__85792__auto__);
}));
return c__85790__auto__;
});
gps.core.t111448.prototype.om$core$IInitState$ = true;
gps.core.t111448.prototype.om$core$IInitState$init_state$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"coord-chan","coord-chan",1157103260),cljs.core.async.chan.call(null)], null);
});
gps.core.t111448.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_111450){var self__ = this;
var _111450__$1 = this;return self__.meta111449;
});
gps.core.t111448.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_111450,meta111449__$1){var self__ = this;
var _111450__$1 = this;return (new gps.core.t111448(self__.owner,self__.app,self__.deals_view,meta111449__$1));
});
gps.core.__GT_t111448 = (function __GT_t111448(owner__$1,app__$1,deals_view__$1,meta111449){return (new gps.core.t111448(owner__$1,app__$1,deals_view__$1,meta111449));
});
}
return (new gps.core.t111448(owner,app,deals_view,null));
});
om.core.root.call(null,gps.core.lon_lat_view,gps.core.app_state,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",4427965699),goog.dom.getElement("coord")], null));
om.core.root.call(null,gps.core.deals_view,gps.core.app_state,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",4427965699),goog.dom.getElement("deals")], null));

//# sourceMappingURL=core.js.map