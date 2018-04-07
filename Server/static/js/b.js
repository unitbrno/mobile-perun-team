(function(){!function(o){"use strict"
o.fn.emulateTransitionEnd=function(t){var e=!1,i=this
return o(this).one("bsTransitionEnd",function(){e=!0}),setTimeout(function(){e||o(i).trigger(o.support.transition.end)},t),this},o(function(){o.support.transition=function(){var t,e=document.createElement("bootstrap"),i={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"}
for(t in i)if(void 0!==e.style[t])return{end:i[t]}
return!1}(),o.support.transition&&(o.event.special.bsTransitionEnd={bindType:o.support.transition.end,delegateType:o.support.transition.end,handle:function(t){if(o(t.target).is(this))return t.handleObj.handler.apply(this,arguments)}})})}(jQuery),function(s){"use strict"
var t,a=function(t,e){this.options=e,this.$body=s(document.body),this.$element=s(t),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,s.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))}
function r(o,n){return this.each(function(){var t=s(this),e=t.data("bs.modal"),i=s.extend({},a.DEFAULTS,t.data(),"object"==typeof o&&o)
e||t.data("bs.modal",e=new a(this,i)),"string"==typeof o?e[o](n):i.show&&e.show(n)})}a.VERSION="3.3.5",a.TRANSITION_DURATION=300,a.BACKDROP_TRANSITION_DURATION=150,a.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},a.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},a.prototype.show=function(i){var o=this,t=s.Event("show.bs.modal",{relatedTarget:i})
this.$element.trigger(t),this.isShown||t.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',s.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){o.$element.one("mouseup.dismiss.bs.modal",function(t){s(t.target).is(o.$element)&&(o.ignoreBackdropClick=!0)})}),this.backdrop(function(){var t,e=s.support.transition&&o.$element.hasClass("fade")
o.$element.parent().length||o.$element.appendTo(o.$body),o.$element.show().scrollTop(0),o.adjustDialog(),e&&o.$element[0].offsetWidth,o.$element.addClass("in"),o.enforceFocus(),t=s.Event("shown.bs.modal",{relatedTarget:i}),e?o.$dialog.one("bsTransitionEnd",function(){o.$element.trigger("focus").trigger(t)}).emulateTransitionEnd(a.TRANSITION_DURATION):o.$element.trigger("focus").trigger(t)}))},a.prototype.hide=function(t){t&&t.preventDefault(),t=s.Event("hide.bs.modal"),this.$element.trigger(t),this.isShown&&!t.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),s(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),s.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",s.proxy(this.hideModal,this)).emulateTransitionEnd(a.TRANSITION_DURATION):this.hideModal())},a.prototype.enforceFocus=function(){s(document).off("focusin.bs.modal").on("focusin.bs.modal",s.proxy(function(t){this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},a.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",s.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},a.prototype.resize=function(){this.isShown?s(window).on("resize.bs.modal",s.proxy(this.handleUpdate,this)):s(window).off("resize.bs.modal")},a.prototype.hideModal=function(){var t=this
this.$element.hide(),this.backdrop(function(){t.$body.removeClass("modal-open"),t.resetAdjustments(),t.resetScrollbar(),t.$element.trigger("hidden.bs.modal")})},a.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},a.prototype.backdrop=function(t){var e,i,o=this,n=this.$element.hasClass("fade")?"fade":""
if(this.isShown&&this.options.backdrop){if(e=s.support.transition&&n,this.$backdrop=s(document.createElement("div")).addClass("modal-backdrop "+n).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",s.proxy(function(t){this.ignoreBackdropClick?this.ignoreBackdropClick=!1:t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide())},this)),e&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!t)return
e?this.$backdrop.one("bsTransitionEnd",t).emulateTransitionEnd(a.BACKDROP_TRANSITION_DURATION):t()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),i=function(){o.removeBackdrop(),t&&t()},s.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",i).emulateTransitionEnd(a.BACKDROP_TRANSITION_DURATION):i()):t&&t()},a.prototype.handleUpdate=function(){this.adjustDialog()},a.prototype.adjustDialog=function(){var t=this.$element[0].scrollHeight>document.documentElement.clientHeight
this.$element.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:""})},a.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},a.prototype.checkScrollbar=function(){var t,e=window.innerWidth
e||(e=(t=document.documentElement.getBoundingClientRect()).right-Math.abs(t.left)),this.bodyIsOverflowing=document.body.clientWidth<e,this.scrollbarWidth=this.measureScrollbar()},a.prototype.setScrollbar=function(){var t=parseInt(this.$body.css("padding-right")||0,10)
this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",t+this.scrollbarWidth)},a.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},a.prototype.measureScrollbar=function(){var t,e=document.createElement("div")
return e.className="modal-scrollbar-measure",this.$body.append(e),t=e.offsetWidth-e.clientWidth,this.$body[0].removeChild(e),t},t=s.fn.modal,s.fn.modal=r,s.fn.modal.Constructor=a,s.fn.modal.noConflict=function(){return s.fn.modal=t,this},s(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(t){var e=s(this),i=e.attr("href"),o=s(e.attr("data-target")||i&&i.replace(/.*(?=#[^\s]+$)/,"")),n=o.data("bs.modal")?"toggle":s.extend({remote:!/#/.test(i)&&i},o.data(),e.data())
e.is("a")&&t.preventDefault(),o.one("show.bs.modal",function(t){t.isDefaultPrevented()||o.one("hidden.bs.modal",function(){e.is(":visible")&&e.trigger("focus")})}),r.call(o,n,this)})}(jQuery),function(r){"use strict"
var t,e=".dropdown-backdrop",l='[data-toggle="dropdown"]',o=function(t){r(t).on("click.bs.dropdown",this.toggle)}
function h(t){var e,i=t.attr("data-target")
return i||(i=(i=t.attr("href"))&&/#[A-Za-z]/.test(i)&&i.replace(/.*(?=#[^\s]*$)/,"")),(e=i&&r(i))&&e.length?e:t.parent()}function s(o){o&&3===o.which||(r(e).remove(),r(l).each(function(){var t=r(this),e=h(t),i={relatedTarget:this}
e.hasClass("open")&&(o&&"click"==o.type&&/input|textarea/i.test(o.target.tagName)&&r.contains(e[0],o.target)||(e.trigger(o=r.Event("hide.bs.dropdown",i)),o.isDefaultPrevented()||(t.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",i))))}))}o.VERSION="3.3.5",o.prototype.toggle=function(t){var e,i,o,n=r(this)
if(!n.is(".disabled, :disabled")){if(i=(e=h(n)).hasClass("open"),s(),!i){if("ontouchstart"in document.documentElement&&!e.closest(".navbar-nav").length&&r(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(r(this)).on("click",s),o={relatedTarget:this},e.trigger(t=r.Event("show.bs.dropdown",o)),t.isDefaultPrevented())return
n.trigger("focus").attr("aria-expanded","true"),e.toggleClass("open").trigger("shown.bs.dropdown",o)}return!1}},o.prototype.keydown=function(t){var e,i,o,n,s,a
if(/(38|40|27|32)/.test(t.which)&&!/input|textarea/i.test(t.target.tagName)&&(e=r(this),t.preventDefault(),t.stopPropagation(),!e.is(".disabled, :disabled"))){if(!(o=(i=h(e)).hasClass("open"))&&27!=t.which||o&&27==t.which)return 27==t.which&&i.find(l).trigger("focus"),e.trigger("click")
n=" li:not(.disabled):visible a",(s=i.find(".dropdown-menu"+n)).length&&(a=s.index(t.target),38==t.which&&0<a&&a--,40==t.which&&a<s.length-1&&a++,~a||(a=0),s.eq(a).trigger("focus"))}},t=r.fn.dropdown,r.fn.dropdown=function(i){return this.each(function(){var t=r(this),e=t.data("bs.dropdown")
e||t.data("bs.dropdown",e=new o(this)),"string"==typeof i&&e[i].call(t)})},r.fn.dropdown.Constructor=o,r.fn.dropdown.noConflict=function(){return r.fn.dropdown=t,this},r(document).on("click.bs.dropdown.data-api",s).on("click.bs.dropdown.data-api",".dropdown form",function(t){t.stopPropagation()}).on("click.bs.dropdown.data-api",l,o.prototype.toggle).on("keydown.bs.dropdown.data-api",l,o.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",o.prototype.keydown)}(jQuery),function(s){"use strict"
function n(t,e){this.$body=s(document.body),this.$scrollElement=s(t).is(document.body)?s(window):s(t),this.options=s.extend({},n.DEFAULTS,e),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",s.proxy(this.process,this)),this.refresh(),this.process()}function e(o){return this.each(function(){var t=s(this),e=t.data("bs.scrollspy"),i="object"==typeof o&&o
e||t.data("bs.scrollspy",e=new n(this,i)),"string"==typeof o&&e[o]()})}n.VERSION="3.3.5",n.DEFAULTS={offset:10},n.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},n.prototype.refresh=function(){var t=this,o="offset",n=0
this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),s.isWindow(this.$scrollElement[0])||(o="position",n=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var t=s(this),e=t.data("target")||t.attr("href"),i=/^#./.test(e)&&s(e)
return i&&i.length&&i.is(":visible")&&[[i[o]().top+n,e]]||null}).sort(function(t,e){return t[0]-e[0]}).each(function(){t.offsets.push(this[0]),t.targets.push(this[1])})},n.prototype.process=function(){var t,e=this.$scrollElement.scrollTop()+this.options.offset,i=this.getScrollHeight(),o=this.options.offset+i-this.$scrollElement.height(),n=this.offsets,s=this.targets,a=this.activeTarget
if(this.scrollHeight!=i&&this.refresh(),o<=e)return a!=(t=s[s.length-1])&&this.activate(t)
if(a&&e<n[0])return this.activeTarget=null,this.clear()
for(t=n.length;t--;)a!=s[t]&&e>=n[t]&&(void 0===n[t+1]||e<n[t+1])&&this.activate(s[t])},n.prototype.activate=function(t){var e,i
this.activeTarget=t,this.clear(),e=this.selector+'[data-target="'+t+'"],'+this.selector+'[href="'+t+'"]',(i=s(e).parents("li").addClass("active")).parent(".dropdown-menu").length&&(i=i.closest("li.dropdown").addClass("active")),i.trigger("activate.bs.scrollspy")},n.prototype.clear=function(){s(this.selector).parentsUntil(this.options.target,".active").removeClass("active")}
var t=s.fn.scrollspy
s.fn.scrollspy=e,s.fn.scrollspy.Constructor=n,s.fn.scrollspy.noConflict=function(){return s.fn.scrollspy=t,this},s(window).on("load.bs.scrollspy.data-api",function(){s('[data-spy="scroll"]').each(function(){var t=s(this)
e.call(t,t.data())})})}(jQuery),function(r){"use strict"
var t,e,a=function(t){this.element=r(t)}
function i(i){return this.each(function(){var t=r(this),e=t.data("bs.tab")
e||t.data("bs.tab",e=new a(this)),"string"==typeof i&&e[i]()})}a.VERSION="3.3.5",a.TRANSITION_DURATION=150,a.prototype.show=function(){var t,e,i,o,n=this.element,s=n.closest("ul:not(.dropdown-menu)"),a=n.data("target")
a||(a=(a=n.attr("href"))&&a.replace(/.*(?=#[^\s]*$)/,"")),n.parent("li").hasClass("active")||(t=s.find(".active:last a"),e=r.Event("hide.bs.tab",{relatedTarget:n[0]}),i=r.Event("show.bs.tab",{relatedTarget:t[0]}),t.trigger(e),n.trigger(i),i.isDefaultPrevented()||e.isDefaultPrevented()||(o=r(a),this.activate(n.closest("li"),s),this.activate(o,o.parent(),function(){t.trigger({type:"hidden.bs.tab",relatedTarget:n[0]}),n.trigger({type:"shown.bs.tab",relatedTarget:t[0]})})))},a.prototype.activate=function(t,e,i){var o=e.find("> .active"),n=i&&r.support.transition&&(o.length&&o.hasClass("fade")||!!e.find("> .fade").length)
function s(){o.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),t.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),n?(t[0].offsetWidth,t.addClass("in")):t.removeClass("fade"),t.parent(".dropdown-menu").length&&t.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),i&&i()}o.length&&n?o.one("bsTransitionEnd",s).emulateTransitionEnd(a.TRANSITION_DURATION):s(),o.removeClass("in")},t=r.fn.tab,r.fn.tab=i,r.fn.tab.Constructor=a,r.fn.tab.noConflict=function(){return r.fn.tab=t,this},e=function(t){t.preventDefault(),i.call(r(this),"show")},r(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),function(g){"use strict"
var t,m=function(t,e){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",t,e)}
m.VERSION="3.3.5",m.TRANSITION_DURATION=150,m.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},m.prototype.init=function(t,e,i){var o,n,s,a,r
if(this.enabled=!0,this.type=t,this.$element=g(e),this.options=this.getOptions(i),this.$viewport=this.options.viewport&&g(g.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!")
for(n=(o=this.options.trigger.split(" ")).length;n--;)"click"==(s=o[n])?this.$element.on("click."+this.type,this.options.selector,g.proxy(this.toggle,this)):"manual"!=s&&(a="hover"==s?"mouseenter":"focusin",r="hover"==s?"mouseleave":"focusout",this.$element.on(a+"."+this.type,this.options.selector,g.proxy(this.enter,this)),this.$element.on(r+"."+this.type,this.options.selector,g.proxy(this.leave,this)))
this.options.selector?this._options=g.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},m.prototype.getDefaults=function(){return m.DEFAULTS},m.prototype.getOptions=function(t){return(t=g.extend({},this.getDefaults(),this.$element.data(),t)).delay&&"number"==typeof t.delay&&(t.delay={show:t.delay,hide:t.delay}),t},m.prototype.getDelegateOptions=function(){var i={},o=this.getDefaults()
return this._options&&g.each(this._options,function(t,e){o[t]!=e&&(i[t]=e)}),i},m.prototype.enter=function(t){var e=t instanceof this.constructor?t:g(t.currentTarget).data("bs."+this.type)
if(e||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),g(t.currentTarget).data("bs."+this.type,e)),t instanceof g.Event&&(e.inState["focusin"==t.type?"focus":"hover"]=!0),e.tip().hasClass("in")||"in"==e.hoverState)e.hoverState="in"
else{if(clearTimeout(e.timeout),e.hoverState="in",!e.options.delay||!e.options.delay.show)return e.show()
e.timeout=setTimeout(function(){"in"==e.hoverState&&e.show()},e.options.delay.show)}},m.prototype.isInStateTrue=function(){for(var t in this.inState)if(this.inState[t])return!0
return!1},m.prototype.leave=function(t){var e=t instanceof this.constructor?t:g(t.currentTarget).data("bs."+this.type)
if(e||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),g(t.currentTarget).data("bs."+this.type,e)),t instanceof g.Event&&(e.inState["focusout"==t.type?"focus":"hover"]=!1),!e.isInStateTrue()){if(clearTimeout(e.timeout),e.hoverState="out",!e.options.delay||!e.options.delay.hide)return e.hide()
e.timeout=setTimeout(function(){"out"==e.hoverState&&e.hide()},e.options.delay.hide)}},m.prototype.show=function(){var t,e,i,o,n,s,a,r,l,h,d,p,c,f,u=g.Event("show.bs."+this.type)
if(this.hasContent()&&this.enabled){if(this.$element.trigger(u),t=g.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]),u.isDefaultPrevented()||!t)return
i=(e=this).tip(),o=this.getUID(this.type),this.setContent(),i.attr("id",o),this.$element.attr("aria-describedby",o),this.options.animation&&i.addClass("fade"),n="function"==typeof this.options.placement?this.options.placement.call(this,i[0],this.$element[0]):this.options.placement,(a=(s=/\s?auto?\s?/i).test(n))&&(n=n.replace(s,"")||"top"),i.detach().css({top:0,left:0,display:"block"}).addClass(n).data("bs."+this.type,this),this.options.container?i.appendTo(this.options.container):i.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type),r=this.getPosition(),l=i[0].offsetWidth,h=i[0].offsetHeight,a&&(d=n,p=this.getPosition(this.$viewport),n="bottom"==n&&r.bottom+h>p.bottom?"top":"top"==n&&r.top-h<p.top?"bottom":"right"==n&&r.right+l>p.width?"left":"left"==n&&r.left-l<p.left?"right":n,i.removeClass(d).addClass(n)),c=this.getCalculatedOffset(n,r,l,h),this.applyPlacement(c,n),f=function(){var t=e.hoverState
e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==t&&e.leave(e)},g.support.transition&&this.$tip.hasClass("fade")?i.one("bsTransitionEnd",f).emulateTransitionEnd(m.TRANSITION_DURATION):f()}},m.prototype.applyPlacement=function(t,e){var i,o,n,s,a,r,l=this.tip(),h=l[0].offsetWidth,d=l[0].offsetHeight,p=parseInt(l.css("margin-top"),10),c=parseInt(l.css("margin-left"),10)
isNaN(p)&&(p=0),isNaN(c)&&(c=0),t.top+=p,t.left+=c,g.offset.setOffset(l[0],g.extend({using:function(t){l.css({top:Math.round(t.top),left:Math.round(t.left)})}},t),0),l.addClass("in"),i=l[0].offsetWidth,o=l[0].offsetHeight,"top"==e&&o!=d&&(t.top=t.top+d-o),(n=this.getViewportAdjustedDelta(e,t,i,o)).left?t.left+=n.left:t.top+=n.top,a=(s=/top|bottom/.test(e))?2*n.left-h+i:2*n.top-d+o,r=s?"offsetWidth":"offsetHeight",l.offset(t),this.replaceArrow(a,l[0][r],s)},m.prototype.replaceArrow=function(t,e,i){this.arrow().css(i?"left":"top",50*(1-t/e)+"%").css(i?"top":"left","")},m.prototype.setContent=function(){var t=this.tip(),e=this.getTitle()
t.find(".tooltip-inner")[this.options.html?"html":"text"](e),t.removeClass("fade in top bottom left right")},m.prototype.hide=function(t){var e=this,i=g(this.$tip),o=g.Event("hide.bs."+this.type)
function n(){"in"!=e.hoverState&&i.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),t&&t()}if(this.$element.trigger(o),!o.isDefaultPrevented())return i.removeClass("in"),g.support.transition&&i.hasClass("fade")?i.one("bsTransitionEnd",n).emulateTransitionEnd(m.TRANSITION_DURATION):n(),this.hoverState=null,this},m.prototype.fixTitle=function(){var t=this.$element;(t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title",t.attr("title")||"").attr("title","")},m.prototype.hasContent=function(){return this.getTitle()},m.prototype.getPosition=function(t){var e,i,o,n,s,a
return i="BODY"==(e=(t=t||this.$element)[0]).tagName,null==(o=e.getBoundingClientRect()).width&&(o=g.extend({},o,{width:o.right-o.left,height:o.bottom-o.top})),n=i?{top:0,left:0}:t.offset(),s={scroll:i?document.documentElement.scrollTop||document.body.scrollTop:t.scrollTop()},a=i?{width:g(window).width(),height:g(window).height()}:null,g.extend({},o,s,a,n)},m.prototype.getCalculatedOffset=function(t,e,i,o){return"bottom"==t?{top:e.top+e.height,left:e.left+e.width/2-i/2}:"top"==t?{top:e.top-o,left:e.left+e.width/2-i/2}:"left"==t?{top:e.top+e.height/2-o/2,left:e.left-i}:{top:e.top+e.height/2-o/2,left:e.left+e.width}},m.prototype.getViewportAdjustedDelta=function(t,e,i,o){var n,s,a,r,l,h,d={top:0,left:0}
return this.$viewport&&(n=this.options.viewport&&this.options.viewport.padding||0,s=this.getPosition(this.$viewport),/right|left/.test(t)?(a=e.top-n-s.scroll,r=e.top+n-s.scroll+o,a<s.top?d.top=s.top-a:r>s.top+s.height&&(d.top=s.top+s.height-r)):(l=e.left-n,h=e.left+n+i,l<s.left?d.left=s.left-l:h>s.right&&(d.left=s.left+s.width-h))),d},m.prototype.getTitle=function(){var t=this.$element,e=this.options,i=t.attr("data-original-title")||("function"==typeof e.title?e.title.call(t[0]):e.title)
return i},m.prototype.getUID=function(t){for(;t+=~~(1e6*Math.random()),document.getElementById(t););return t},m.prototype.tip=function(){if(!this.$tip&&(this.$tip=g(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!")
return this.$tip},m.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},m.prototype.enable=function(){this.enabled=!0},m.prototype.disable=function(){this.enabled=!1},m.prototype.toggleEnabled=function(){this.enabled=!this.enabled},m.prototype.toggle=function(t){var e=this
t&&((e=g(t.currentTarget).data("bs."+this.type))||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),g(t.currentTarget).data("bs."+this.type,e))),t?(e.inState.click=!e.inState.click,e.isInStateTrue()?e.enter(e):e.leave(e)):e.tip().hasClass("in")?e.leave(e):e.enter(e)},m.prototype.destroy=function(){var t=this
clearTimeout(this.timeout),this.hide(function(){t.$element.off("."+t.type).removeData("bs."+t.type),t.$tip&&t.$tip.detach(),t.$tip=null,t.$arrow=null,t.$viewport=null})},t=g.fn.tooltip,g.fn.tooltip=function(o){return this.each(function(){var t=g(this),e=t.data("bs.tooltip"),i="object"==typeof o&&o
!e&&/destroy|hide/.test(o)||(e||t.data("bs.tooltip",e=new m(this,i)),"string"==typeof o&&e[o]())})},g.fn.tooltip.Constructor=m,g.fn.tooltip.noConflict=function(){return g.fn.tooltip=t,this}}(jQuery),function(n){"use strict"
var t,s=function(t,e){this.init("popover",t,e)}
if(!n.fn.tooltip)throw new Error("Popover requires tooltip.js")
s.VERSION="3.3.5",s.DEFAULTS=n.extend({},n.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),s.prototype=n.extend({},n.fn.tooltip.Constructor.prototype),(s.prototype.constructor=s).prototype.getDefaults=function(){return s.DEFAULTS},s.prototype.setContent=function(){var t=this.tip(),e=this.getTitle(),i=this.getContent()
t.find(".popover-title")[this.options.html?"html":"text"](e),t.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof i?"html":"append":"text"](i),t.removeClass("fade top bottom left right in"),t.find(".popover-title").html()||t.find(".popover-title").hide()},s.prototype.hasContent=function(){return this.getTitle()||this.getContent()},s.prototype.getContent=function(){var t=this.$element,e=this.options
return t.attr("data-content")||("function"==typeof e.content?e.content.call(t[0]):e.content)},s.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},t=n.fn.popover,n.fn.popover=function(o){return this.each(function(){var t=n(this),e=t.data("bs.popover"),i="object"==typeof o&&o
!e&&/destroy|hide/.test(o)||(e||t.data("bs.popover",e=new s(this,i)),"string"==typeof o&&e[o]())})},n.fn.popover.Constructor=s,n.fn.popover.noConflict=function(){return n.fn.popover=t,this}}(jQuery),function(s){"use strict"
var t,e='[data-dismiss="alert"]',a=function(t){s(t).on("click",e,this.close)}
a.VERSION="3.3.5",a.TRANSITION_DURATION=150,a.prototype.close=function(t){var e,i=s(this),o=i.attr("data-target")
function n(){e.detach().trigger("closed.bs.alert").remove()}o||(o=(o=i.attr("href"))&&o.replace(/.*(?=#[^\s]*$)/,"")),e=s(o),t&&t.preventDefault(),e.length||(e=i.closest(".alert")),e.trigger(t=s.Event("close.bs.alert")),t.isDefaultPrevented()||(e.removeClass("in"),s.support.transition&&e.hasClass("fade")?e.one("bsTransitionEnd",n).emulateTransitionEnd(a.TRANSITION_DURATION):n())},t=s.fn.alert,s.fn.alert=function(i){return this.each(function(){var t=s(this),e=t.data("bs.alert")
e||t.data("bs.alert",e=new a(this)),"string"==typeof i&&e[i].call(t)})},s.fn.alert.Constructor=a,s.fn.alert.noConflict=function(){return s.fn.alert=t,this},s(document).on("click.bs.alert.data-api",e,a.prototype.close)}(jQuery),function(s){"use strict"
var t,n=function(t,e){this.$element=s(t),this.options=s.extend({},n.DEFAULTS,e),this.isLoading=!1}
function i(o){return this.each(function(){var t=s(this),e=t.data("bs.button"),i="object"==typeof o&&o
e||t.data("bs.button",e=new n(this,i)),"toggle"==o?e.toggle():o&&e.setState(o)})}n.VERSION="3.3.5",n.DEFAULTS={loadingText:"loading..."},n.prototype.setState=function(t){var e="disabled",i=this.$element,o=i.is("input")?"val":"html",n=i.data()
t+="Text",null==n.resetText&&i.data("resetText",i[o]()),setTimeout(s.proxy(function(){i[o](null==n[t]?this.options[t]:n[t]),"loadingText"==t?(this.isLoading=!0,i.addClass(e).attr(e,e)):this.isLoading&&(this.isLoading=!1,i.removeClass(e).removeAttr(e))},this),0)},n.prototype.toggle=function(){var t,e=!0,i=this.$element.closest('[data-toggle="buttons"]')
i.length?("radio"==(t=this.$element.find("input")).prop("type")?(t.prop("checked")&&(e=!1),i.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==t.prop("type")&&(t.prop("checked")!==this.$element.hasClass("active")&&(e=!1),this.$element.toggleClass("active")),t.prop("checked",this.$element.hasClass("active")),e&&t.trigger("change")):(this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active"))},t=s.fn.button,s.fn.button=i,s.fn.button.Constructor=n,s.fn.button.noConflict=function(){return s.fn.button=t,this},s(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(t){var e=s(t.target)
e.hasClass("btn")||(e=e.closest(".btn")),i.call(e,"toggle"),s(t.target).is('input[type="radio"]')||s(t.target).is('input[type="checkbox"]')||t.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(t){s(t.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(t.type))})}(jQuery),function(a){"use strict"
var t,r=function(t,e){this.$element=a(t),this.options=a.extend({},r.DEFAULTS,e),this.$trigger=a('[data-toggle="collapse"][href="#'+t.id+'"],[data-toggle="collapse"][data-target="#'+t.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()}
function n(t){var e,i=t.attr("data-target")||(e=t.attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"")
return a(i)}function l(o){return this.each(function(){var t=a(this),e=t.data("bs.collapse"),i=a.extend({},r.DEFAULTS,t.data(),"object"==typeof o&&o)
!e&&i.toggle&&/show|hide/.test(o)&&(i.toggle=!1),e||t.data("bs.collapse",e=new r(this,i)),"string"==typeof o&&e[o]()})}r.VERSION="3.3.5",r.TRANSITION_DURATION=350,r.DEFAULTS={toggle:!0},r.prototype.dimension=function(){return this.$element.hasClass("width")?"width":"height"},r.prototype.show=function(){var t,e,i,o,n,s
if(!this.transitioning&&!this.$element.hasClass("in")&&!((e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing"))&&e.length&&(t=e.data("bs.collapse"))&&t.transitioning||(i=a.Event("show.bs.collapse"),this.$element.trigger(i),i.isDefaultPrevented()))){if(e&&e.length&&(l.call(e,"hide"),t||e.data("bs.collapse",null)),o=this.dimension(),this.$element.removeClass("collapse").addClass("collapsing")[o](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1,n=function(){this.$element.removeClass("collapsing").addClass("collapse in")[o](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")},!a.support.transition)return n.call(this)
s=a.camelCase(["scroll",o].join("-")),this.$element.one("bsTransitionEnd",a.proxy(n,this)).emulateTransitionEnd(r.TRANSITION_DURATION)[o](this.$element[0][s])}},r.prototype.hide=function(){var t,e,i
if(!this.transitioning&&this.$element.hasClass("in")&&(t=a.Event("hide.bs.collapse"),this.$element.trigger(t),!t.isDefaultPrevented())){if(e=this.dimension(),this.$element[e](this.$element[e]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1,i=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")},!a.support.transition)return i.call(this)
this.$element[e](0).one("bsTransitionEnd",a.proxy(i,this)).emulateTransitionEnd(r.TRANSITION_DURATION)}},r.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},r.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(t,e){var i=a(e)
this.addAriaAndCollapsedClass(n(i),i)},this)).end()},r.prototype.addAriaAndCollapsedClass=function(t,e){var i=t.hasClass("in")
t.attr("aria-expanded",i),e.toggleClass("collapsed",!i).attr("aria-expanded",i)},t=a.fn.collapse,a.fn.collapse=l,a.fn.collapse.Constructor=r,a.fn.collapse.noConflict=function(){return a.fn.collapse=t,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(t){var e,i,o=a(this)
o.attr("data-target")||t.preventDefault(),i=(e=n(o)).data("bs.collapse")?"toggle":o.data(),l.call(e,i)})}(jQuery),function(p){"use strict"
var t,e,c=function(t,e){this.$element=p(t),this.$indicators=this.$element.find(".carousel-indicators"),this.options=e,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",p.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",p.proxy(this.pause,this)).on("mouseleave.bs.carousel",p.proxy(this.cycle,this))}
function a(n){return this.each(function(){var t=p(this),e=t.data("bs.carousel"),i=p.extend({},c.DEFAULTS,t.data(),"object"==typeof n&&n),o="string"==typeof n?n:i.slide
e||t.data("bs.carousel",e=new c(this,i)),"number"==typeof n?e.to(n):o?e[o]():i.interval&&e.pause().cycle()})}c.VERSION="3.3.5",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(t){if(!/input|textarea/i.test(t.target.tagName)){switch(t.which){case 37:this.prev()
break
case 39:this.next()
break
default:return}t.preventDefault()}},c.prototype.cycle=function(t){return t||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(p.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(t){return this.$items=t.parent().children(".item"),this.$items.index(t||this.$active)},c.prototype.getItemForDirection=function(t,e){var i,o=this.getItemIndex(e),n="prev"==t&&0===o||"next"==t&&o==this.$items.length-1
return n&&!this.options.wrap?e:(i=(o+("prev"==t?-1:1))%this.$items.length,this.$items.eq(i))},c.prototype.to=function(t){var e=this,i=this.getItemIndex(this.$active=this.$element.find(".item.active"))
if(!(t>this.$items.length-1||t<0))return this.sliding?this.$element.one("slid.bs.carousel",function(){e.to(t)}):i==t?this.pause().cycle():this.slide(i<t?"next":"prev",this.$items.eq(t))},c.prototype.pause=function(t){return t||(this.paused=!0),this.$element.find(".next, .prev").length&&p.support.transition&&(this.$element.trigger(p.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){if(!this.sliding)return this.slide("next")},c.prototype.prev=function(){if(!this.sliding)return this.slide("prev")},c.prototype.slide=function(t,e){var i,o,n,s,a=this.$element.find(".item.active"),r=e||this.getItemForDirection(t,a),l=this.interval,h="next"==t?"left":"right",d=this
return r.hasClass("active")?this.sliding=!1:(i=r[0],o=p.Event("slide.bs.carousel",{relatedTarget:i,direction:h}),this.$element.trigger(o),o.isDefaultPrevented()?void 0:(this.sliding=!0,l&&this.pause(),this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),(n=p(this.$indicators.children()[this.getItemIndex(r)]))&&n.addClass("active")),s=p.Event("slid.bs.carousel",{relatedTarget:i,direction:h}),p.support.transition&&this.$element.hasClass("slide")?(r.addClass(t),r[0].offsetWidth,a.addClass(h),r.addClass(h),a.one("bsTransitionEnd",function(){r.removeClass([t,h].join(" ")).addClass("active"),a.removeClass(["active",h].join(" ")),d.sliding=!1,setTimeout(function(){d.$element.trigger(s)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(a.removeClass("active"),r.addClass("active"),this.sliding=!1,this.$element.trigger(s)),l&&this.cycle(),this))},t=p.fn.carousel,p.fn.carousel=a,p.fn.carousel.Constructor=c,p.fn.carousel.noConflict=function(){return p.fn.carousel=t,this},e=function(t){var e,i,o,n=p(this),s=p(n.attr("data-target")||(e=n.attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,""))
s.hasClass("carousel")&&(i=p.extend({},s.data(),n.data()),(o=n.attr("data-slide-to"))&&(i.interval=!1),a.call(s,i),o&&s.data("bs.carousel").to(o),t.preventDefault())},p(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),p(window).on("load",function(){p('[data-ride="carousel"]').each(function(){var t=p(this)
a.call(t,t.data())})})}(jQuery),function(l){"use strict"
var t,h=function(t,e){this.options=l.extend({},h.DEFAULTS,e),this.$target=l(this.options.target).on("scroll.bs.affix.data-api",l.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",l.proxy(this.checkPositionWithEventLoop,this)),this.$element=l(t),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()}
function i(o){return this.each(function(){var t=l(this),e=t.data("bs.affix"),i="object"==typeof o&&o
e||t.data("bs.affix",e=new h(this,i)),"string"==typeof o&&e[o]()})}h.VERSION="3.3.5",h.RESET="affix affix-top affix-bottom",h.DEFAULTS={offset:0,target:window},h.prototype.getState=function(t,e,i,o){var n,s,a=this.$target.scrollTop(),r=this.$element.offset(),l=this.$target.height()
return null!=i&&"top"==this.affixed?a<i&&"top":"bottom"==this.affixed?null!=i?!(a+this.unpin<=r.top)&&"bottom":!(a+l<=t-o)&&"bottom":(s=(n=null==this.affixed)?a:r.top,null!=i&&a<=i?"top":null!=o&&t-o<=s+(n?l:e)&&"bottom")},h.prototype.getPinnedOffset=function(){var t,e
return this.pinnedOffset?this.pinnedOffset:(this.$element.removeClass(h.RESET).addClass("affix"),t=this.$target.scrollTop(),e=this.$element.offset(),this.pinnedOffset=e.top-t)},h.prototype.checkPositionWithEventLoop=function(){setTimeout(l.proxy(this.checkPosition,this),1)},h.prototype.checkPosition=function(){var t,e,i,o,n,s,a,r
if(this.$element.is(":visible")){if(t=this.$element.height(),i=(e=this.options.offset).top,o=e.bottom,n=Math.max(l(document).height(),l(document.body).height()),"object"!=typeof e&&(o=i=e),"function"==typeof i&&(i=e.top(this.$element)),"function"==typeof o&&(o=e.bottom(this.$element)),s=this.getState(n,t,i,o),this.affixed!=s){if(null!=this.unpin&&this.$element.css("top",""),a="affix"+(s?"-"+s:""),r=l.Event(a+".bs.affix"),this.$element.trigger(r),r.isDefaultPrevented())return
this.affixed=s,this.unpin="bottom"==s?this.getPinnedOffset():null,this.$element.removeClass(h.RESET).addClass(a).trigger(a.replace("affix","affixed")+".bs.affix")}"bottom"==s&&this.$element.offset({top:n-t-o})}},t=l.fn.affix,l.fn.affix=i,l.fn.affix.Constructor=h,l.fn.affix.noConflict=function(){return l.fn.affix=t,this},l(window).on("load",function(){l('[data-spy="affix"]').each(function(){var t=l(this),e=t.data()
e.offset=e.offset||{},null!=e.offsetBottom&&(e.offset.bottom=e.offsetBottom),null!=e.offsetTop&&(e.offset.top=e.offsetTop),i.call(t,e)})})}(jQuery)}).call(this)
