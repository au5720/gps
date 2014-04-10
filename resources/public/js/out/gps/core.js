// Compiled by ClojureScript 0.0-2156
goog.provide('gps.core');
goog.require('cljs.core');
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
goog.require('goog.events');
cljs.core.enable_console_print_BANG_.call(null);
cljs.core.println.call(null,"Hello world!");
gps.core.meths = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"get","get",1014006472),"GET",new cljs.core.Keyword(null,"put","put",1014015617),"PUT",new cljs.core.Keyword(null,"post","post",1017351186),"POST",new cljs.core.Keyword(null,"delete","delete",3973413149),"DELETE"], null);
gps.core.edn_xhr = (function edn_xhr(p__34125){var map__34127 = p__34125;var map__34127__$1 = ((cljs.core.seq_QMARK_.call(null,map__34127))?cljs.core.apply.call(null,cljs.core.hash_map,map__34127):map__34127);var on_complete = cljs.core.get.call(null,map__34127__$1,new cljs.core.Keyword(null,"on-complete","on-complete",2943599833));var data = cljs.core.get.call(null,map__34127__$1,new cljs.core.Keyword(null,"data","data",1016980252));var url = cljs.core.get.call(null,map__34127__$1,new cljs.core.Keyword(null,"url","url",1014020321));var method = cljs.core.get.call(null,map__34127__$1,new cljs.core.Keyword(null,"method","method",4231316563));var xhr = (new goog.net.XhrIo());goog.events.listen(xhr,goog.net.EventType.COMPLETE,(function (e){return on_complete.call(null,cljs.reader.read_string.call(null,xhr.getResponseText()));
}));
return xhr.send(url,gps.core.meths.call(null,method),(cljs.core.truth_(data)?cljs.core.pr_str.call(null,data):null),{"Content-Type": "application/edn"});
});
gps.core.app_state = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"classes","classes",1867525016),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"deals","deals",1109361913),cljs.core.PersistentVector.EMPTY], null));
gps.core.deal_view = (function deal_view(deal,owner){if(typeof gps.core.t34131 !== 'undefined')
{} else
{
/**
* @constructor
*/
gps.core.t34131 = (function (owner,deal,deal_view,meta34132){
this.owner = owner;
this.deal = deal;
this.deal_view = deal_view;
this.meta34132 = meta34132;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
gps.core.t34131.cljs$lang$type = true;
gps.core.t34131.cljs$lang$ctorStr = "gps.core/t34131";
gps.core.t34131.cljs$lang$ctorPrWriter = (function (this__3970__auto__,writer__3971__auto__,opt__3972__auto__){return cljs.core._write.call(null,writer__3971__auto__,"gps.core/t34131");
});
gps.core.t34131.prototype.om$core$IRender$ = true;
gps.core.t34131.prototype.om$core$IRender$render$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return React.DOM.li(null,React.DOM.div(null,React.DOM.div(null,new cljs.core.Keyword("location","geocode","location/geocode",4683881930).cljs$core$IFn$_invoke$arity$1(self__.deal)),React.DOM.div(null,new cljs.core.Keyword("location","lat","location/lat",4789037289).cljs$core$IFn$_invoke$arity$1(self__.deal)),React.DOM.div(null,new cljs.core.Keyword("location","lon","location/lon",4789036861).cljs$core$IFn$_invoke$arity$1(self__.deal))));
});
gps.core.t34131.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_34133){var self__ = this;
var _34133__$1 = this;return self__.meta34132;
});
gps.core.t34131.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_34133,meta34132__$1){var self__ = this;
var _34133__$1 = this;return (new gps.core.t34131(self__.owner,self__.deal,self__.deal_view,meta34132__$1));
});
gps.core.__GT_t34131 = (function __GT_t34131(owner__$1,deal__$1,deal_view__$1,meta34132){return (new gps.core.t34131(owner__$1,deal__$1,deal_view__$1,meta34132));
});
}
return (new gps.core.t34131(owner,deal,deal_view,null));
});
gps.core.deals_view = (function deals_view(app,owner){if(typeof gps.core.t34138 !== 'undefined')
{} else
{
/**
* @constructor
*/
gps.core.t34138 = (function (owner,app,deals_view,meta34139){
this.owner = owner;
this.app = app;
this.deals_view = deals_view;
this.meta34139 = meta34139;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
gps.core.t34138.cljs$lang$type = true;
gps.core.t34138.cljs$lang$ctorStr = "gps.core/t34138";
gps.core.t34138.cljs$lang$ctorPrWriter = (function (this__3970__auto__,writer__3971__auto__,opt__3972__auto__){return cljs.core._write.call(null,writer__3971__auto__,"gps.core/t34138");
});
gps.core.t34138.prototype.om$core$IRender$ = true;
gps.core.t34138.prototype.om$core$IRender$render$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return React.DOM.div({"id": "deals"},React.DOM.h2(null,"Deals"),cljs.core.apply.call(null,om.dom.ul,null,om.core.build_all.call(null,gps.core.deal_view,new cljs.core.Keyword(null,"deals","deals",1109361913).cljs$core$IFn$_invoke$arity$1(self__.app))));
});
gps.core.t34138.prototype.om$core$IWillMount$ = true;
gps.core.t34138.prototype.om$core$IWillMount$will_mount$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return gps.core.edn_xhr.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"method","method",4231316563),new cljs.core.Keyword(null,"get","get",1014006472),new cljs.core.Keyword(null,"url","url",1014020321),"deals",new cljs.core.Keyword(null,"on-complete","on-complete",2943599833),(function (p1__34134_SHARP_){return om.core.transact_BANG_.call(null,self__.app,new cljs.core.Keyword(null,"deals","deals",1109361913),(function (___$2){return p1__34134_SHARP_;
}));
})], null));
});
gps.core.t34138.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_34140){var self__ = this;
var _34140__$1 = this;return self__.meta34139;
});
gps.core.t34138.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_34140,meta34139__$1){var self__ = this;
var _34140__$1 = this;return (new gps.core.t34138(self__.owner,self__.app,self__.deals_view,meta34139__$1));
});
gps.core.__GT_t34138 = (function __GT_t34138(owner__$1,app__$1,deals_view__$1,meta34139){return (new gps.core.t34138(owner__$1,app__$1,deals_view__$1,meta34139));
});
}
return (new gps.core.t34138(owner,app,deals_view,null));
});
om.core.root.call(null,gps.core.deals_view,gps.core.app_state,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",4427965699),goog.dom.getElement("deals")], null));

//# sourceMappingURL=core.js.map