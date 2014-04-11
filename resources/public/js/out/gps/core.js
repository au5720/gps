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
cljs.core.println.call(null,"Hello world!");
gps.core.meths = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"get","get",1014006472),"GET",new cljs.core.Keyword(null,"put","put",1014015617),"PUT",new cljs.core.Keyword(null,"post","post",1017351186),"POST",new cljs.core.Keyword(null,"delete","delete",3973413149),"DELETE"], null);
gps.core.edn_xhr = (function edn_xhr(p__91496){var map__91498 = p__91496;var map__91498__$1 = ((cljs.core.seq_QMARK_.call(null,map__91498))?cljs.core.apply.call(null,cljs.core.hash_map,map__91498):map__91498);var on_complete = cljs.core.get.call(null,map__91498__$1,new cljs.core.Keyword(null,"on-complete","on-complete",2943599833));var data = cljs.core.get.call(null,map__91498__$1,new cljs.core.Keyword(null,"data","data",1016980252));var url = cljs.core.get.call(null,map__91498__$1,new cljs.core.Keyword(null,"url","url",1014020321));var method = cljs.core.get.call(null,map__91498__$1,new cljs.core.Keyword(null,"method","method",4231316563));var xhr = (new goog.net.XhrIo());goog.events.listen(xhr,goog.net.EventType.COMPLETE,(function (e){return on_complete.call(null,cljs.reader.read_string.call(null,xhr.getResponseText()));
}));
return xhr.send(url,gps.core.meths.call(null,method),(cljs.core.truth_(data)?cljs.core.pr_str.call(null,data):null),{"Content-Type": "application/edn"});
});
gps.core.app_state = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"classes","classes",1867525016),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"deals","deals",1109361913),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"coord","coord",1108749927),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"lon","lon",1014011581),53.345009999999995,new cljs.core.Keyword(null,"lat","lat",1014011153),-6.2613717], null)], null));
gps.core.show_position = (function show_position(){return navigator.geolocation.getCurrentPosition((function (position){var lon = position.coords.longitude;var lat = position.coords.latitude;cljs.core.println.call(null,lon);
cljs.core.println.call(null,lat);
return {"lat": lat, "lon": lon};
}),(function (error){return cljs.core.println.call(null,_.code.call(null,error));
}));
});
gps.core.deal_view = (function deal_view(deal,owner){if(typeof gps.core.t91502 !== 'undefined')
{} else
{
/**
* @constructor
*/
gps.core.t91502 = (function (owner,deal,deal_view,meta91503){
this.owner = owner;
this.deal = deal;
this.deal_view = deal_view;
this.meta91503 = meta91503;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
gps.core.t91502.cljs$lang$type = true;
gps.core.t91502.cljs$lang$ctorStr = "gps.core/t91502";
gps.core.t91502.cljs$lang$ctorPrWriter = (function (this__3970__auto__,writer__3971__auto__,opt__3972__auto__){return cljs.core._write.call(null,writer__3971__auto__,"gps.core/t91502");
});
gps.core.t91502.prototype.om$core$IRender$ = true;
gps.core.t91502.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return React.DOM.li(null,React.DOM.div(null,React.DOM.div(null,new cljs.core.Keyword("location","geocode","location/geocode",4683881930).cljs$core$IFn$_invoke$arity$1(self__.deal)),React.DOM.div(null,new cljs.core.Keyword("location","lat","location/lat",4789037289).cljs$core$IFn$_invoke$arity$1(self__.deal)),React.DOM.div(null,new cljs.core.Keyword("location","lon","location/lon",4789036861).cljs$core$IFn$_invoke$arity$1(self__.deal)),React.DOM.div(null,new cljs.core.Keyword("vendor","name","vendor/name",888980631).cljs$core$IFn$_invoke$arity$1(self__.deal)),React.DOM.div(null,new cljs.core.Keyword("vendor","deal","vendor/deal",889277944).cljs$core$IFn$_invoke$arity$1(self__.deal))));
});
gps.core.t91502.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_91504){var self__ = this;
var _91504__$1 = this;return self__.meta91503;
});
gps.core.t91502.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_91504,meta91503__$1){var self__ = this;
var _91504__$1 = this;return (new gps.core.t91502(self__.owner,self__.deal,self__.deal_view,meta91503__$1));
});
gps.core.__GT_t91502 = (function __GT_t91502(owner__$1,deal__$1,deal_view__$1,meta91503){return (new gps.core.t91502(owner__$1,deal__$1,deal_view__$1,meta91503));
});
}
return (new gps.core.t91502(owner,deal,deal_view,null));
});
gps.core.get_deals = (function get_deals(lat,lon,radius){return gps.core.edn_xhr.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472),new cljs.core.Keyword(null,"url","url",1014020321),[cljs.core.str("deals/"),cljs.core.str(lat),cljs.core.str("/"),cljs.core.str(lon),cljs.core.str("/"),cljs.core.str(radius)].join(''),new cljs.core.Keyword(null,"on-complete","on-complete",2943599833),(function (res){return cljs.core.println.call(null,"server response:",res);
})], null));
});
gps.core.save_coord = (function save_coord(e,owner){var ch = om.core.get_state.call(null,owner,new cljs.core.Keyword(null,"coord-chan","coord-chan",1157103260));var new_coord = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"lon","lon",1014011581),53.345009999999995,new cljs.core.Keyword(null,"lat","lat",1014011153),-6.2613717], null);return cljs.core.async.put_BANG_.call(null,ch,new_coord);
});
gps.core.deals_view = (function deals_view(app,owner){if(typeof gps.core.t91540 !== 'undefined')
{} else
{
/**
* @constructor
*/
gps.core.t91540 = (function (owner,app,deals_view,meta91541){
this.owner = owner;
this.app = app;
this.deals_view = deals_view;
this.meta91541 = meta91541;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
gps.core.t91540.cljs$lang$type = true;
gps.core.t91540.cljs$lang$ctorStr = "gps.core/t91540";
gps.core.t91540.cljs$lang$ctorPrWriter = (function (this__3970__auto__,writer__3971__auto__,opt__3972__auto__){return cljs.core._write.call(null,writer__3971__auto__,"gps.core/t91540");
});
gps.core.t91540.prototype.om$core$IRenderState$ = true;
gps.core.t91540.prototype.om$core$IRenderState$render_state$arity$2 = (function (_,state){var self__ = this;
var ___$1 = this;return React.DOM.div({"id": "deals"},React.DOM.h2(null,"Deals"),React.DOM.button({"onClick": (function (p1__91506_SHARP_){return gps.core.save_coord.call(null,p1__91506_SHARP_,self__.owner);
})},"Refresh"),cljs.core.apply.call(null,om.dom.ul,null,om.core.build_all.call(null,gps.core.deal_view,new cljs.core.Keyword(null,"deals","deals",1109361913).cljs$core$IFn$_invoke$arity$1(self__.app))));
});
gps.core.t91540.prototype.om$core$IWillMount$ = true;
gps.core.t91540.prototype.om$core$IWillMount$will_mount$arity$1 = (function (_){var self__ = this;
var ___$1 = this;var ch = om.core.get_state.call(null,self__.owner,new cljs.core.Keyword(null,"coord-chan","coord-chan",1157103260));var c__85790__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__85791__auto__ = (function (){var switch__85775__auto__ = (function (state_91561){var state_val_91562 = (state_91561[1]);if((state_val_91562 === 4))
{var inst_91545 = (state_91561[2]);var inst_91546 = new cljs.core.Keyword(null,"lon","lon",1014011581).cljs$core$IFn$_invoke$arity$1(inst_91545);var inst_91547 = new cljs.core.Keyword(null,"lat","lat",1014011153).cljs$core$IFn$_invoke$arity$1(inst_91545);var inst_91548 = cljs.core.rand.call(null);var inst_91549 = (10 * inst_91548);var inst_91550 = (inst_91549 | 0);var inst_91551 = [new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"url","url",1014020321),new cljs.core.Keyword(null,"on-complete","on-complete",2943599833)];var inst_91552 = [cljs.core.str("deals/"),cljs.core.str(inst_91546),cljs.core.str("/"),cljs.core.str(inst_91547),cljs.core.str("/"),cljs.core.str(inst_91550)].join('');var inst_91553 = (function (){var radius = inst_91550;var lat = inst_91547;var lon = inst_91546;var coord_update = inst_91545;return ((function (radius,lat,lon,coord_update,inst_91545,inst_91546,inst_91547,inst_91548,inst_91549,inst_91550,inst_91551,inst_91552,state_val_91562){
return (function (p1__91505_SHARP_){return om.core.transact_BANG_.call(null,self__.app,new cljs.core.Keyword(null,"deals","deals",1109361913),((function (radius,lat,lon,coord_update,inst_91545,inst_91546,inst_91547,inst_91548,inst_91549,inst_91550,inst_91551,inst_91552,state_val_91562){
return (function (___$2){return p1__91505_SHARP_;
});})(radius,lat,lon,coord_update,inst_91545,inst_91546,inst_91547,inst_91548,inst_91549,inst_91550,inst_91551,inst_91552,state_val_91562))
);
});
;})(radius,lat,lon,coord_update,inst_91545,inst_91546,inst_91547,inst_91548,inst_91549,inst_91550,inst_91551,inst_91552,state_val_91562))
})();var inst_91554 = [new cljs.core.Keyword(null,"get","get",1014006472),inst_91552,inst_91553];var inst_91555 = cljs.core.PersistentHashMap.fromArrays.call(null,inst_91551,inst_91554);var inst_91556 = gps.core.edn_xhr.call(null,inst_91555);var state_91561__$1 = (function (){var statearr_91563 = state_91561;(statearr_91563[7] = inst_91556);
return statearr_91563;
})();var statearr_91564_91573 = state_91561__$1;(statearr_91564_91573[2] = null);
(statearr_91564_91573[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_91562 === 3))
{var inst_91559 = (state_91561[2]);var state_91561__$1 = state_91561;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_91561__$1,inst_91559);
} else
{if((state_val_91562 === 2))
{var state_91561__$1 = state_91561;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_91561__$1,4,ch);
} else
{if((state_val_91562 === 1))
{var state_91561__$1 = state_91561;var statearr_91565_91574 = state_91561__$1;(statearr_91565_91574[2] = null);
(statearr_91565_91574[1] = 2);
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
var state_machine__85776__auto____0 = (function (){var statearr_91569 = [null,null,null,null,null,null,null,null];(statearr_91569[0] = state_machine__85776__auto__);
(statearr_91569[1] = 1);
return statearr_91569;
});
var state_machine__85776__auto____1 = (function (state_91561){while(true){
var ret_value__85777__auto__ = (function (){try{while(true){
var result__85778__auto__ = switch__85775__auto__.call(null,state_91561);if(cljs.core.keyword_identical_QMARK_.call(null,result__85778__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__85778__auto__;
}
break;
}
}catch (e91570){if((e91570 instanceof Object))
{var ex__85779__auto__ = e91570;var statearr_91571_91575 = state_91561;(statearr_91571_91575[5] = ex__85779__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_91561);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e91570;
} else
{return null;
}
}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__85777__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
var G__91576 = state_91561;
state_91561 = G__91576;
continue;
}
} else
{return ret_value__85777__auto__;
}
break;
}
});
state_machine__85776__auto__ = function(state_91561){
switch(arguments.length){
case 0:
return state_machine__85776__auto____0.call(this);
case 1:
return state_machine__85776__auto____1.call(this,state_91561);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__85776__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__85776__auto____0;
state_machine__85776__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__85776__auto____1;
return state_machine__85776__auto__;
})()
;})(switch__85775__auto__))
})();var state__85792__auto__ = (function (){var statearr_91572 = f__85791__auto__.call(null);(statearr_91572[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__85790__auto__);
return statearr_91572;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__85792__auto__);
}));
return c__85790__auto__;
});
gps.core.t91540.prototype.om$core$IInitState$ = true;
gps.core.t91540.prototype.om$core$IInitState$init_state$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"coord-chan","coord-chan",1157103260),cljs.core.async.chan.call(null)], null);
});
gps.core.t91540.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_91542){var self__ = this;
var _91542__$1 = this;return self__.meta91541;
});
gps.core.t91540.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_91542,meta91541__$1){var self__ = this;
var _91542__$1 = this;return (new gps.core.t91540(self__.owner,self__.app,self__.deals_view,meta91541__$1));
});
gps.core.__GT_t91540 = (function __GT_t91540(owner__$1,app__$1,deals_view__$1,meta91541){return (new gps.core.t91540(owner__$1,app__$1,deals_view__$1,meta91541));
});
}
return (new gps.core.t91540(owner,app,deals_view,null));
});
om.core.root.call(null,gps.core.deals_view,gps.core.app_state,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",4427965699),goog.dom.getElement("deals")], null));

//# sourceMappingURL=core.js.map