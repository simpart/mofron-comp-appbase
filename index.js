/**
 * @file mofron-comp-appbase/index.js
 * @brief common application component for mofron
 *        it makes easy to build page.
 * @license MIT
 */
const Header  = require('mofron-comp-appheader');
const Image   = require('mofron-comp-image');
const Synwin  = require('mofron-effect-syncwin');
const comutl  = mofron.util.common;
const cmputl  = mofron.util.component;
const ConfArg = mofron.class.ConfArg;

module.exports = class extends mofron.class.Component {
    /**
     * initialize component
     *
     * @param (mixed) title parameter
     *                dict: component config list
     * @param (component) child component
     * @short title,child
     * @type private
     */
    constructor (p1, p2) {
        try {
            super();
            this.modname("AppBase");
            this.shortForm("title", "child");
	    
	    if (0 < arguments.length) {
                this.config(p1,p2);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @type private
     */
    initDomConts () {
        try {
            super.initDomConts();
            
	    this.header(new Header());
	    this.bgwrap(new mofron.class.Component());
	    let conts = new mofron.class.Component({ width : '100%' });

            this.child([this.header(), this.bgwrap(), conts]);
            this.childDom(conts.childDom());
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    /**
     * set app title (header text)
     *
     * @param (mixed) string/mofron-comp-text: app title
     * @param (mixed) string: path to app logo image
     *                mofron-comp-image: logo image
     * @return (mofron-comp-text) app title
     * @type parameter
     */
    title (prm, img, href) {
        try {
            let ret = this.header().title(prm);
            if (undefined === prm) {
                return ret;
	    }
	    this.header().image(img);
	    this.header().url(href);
        } catch (e) {
            console.error(e.stack);
            throw e;
        } 
    }

    /**
     * app header
     * 
     * @param (mofron-comp-header) header component
     * @return (mofron-comp-header) header component
     * @type parameter
     */
    header (prm) {
        try {
	    return this.innerComp('header', prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * background wrapper
     *
     * @param (component) background wrapper component
     * @return (component) background wrapper component
     * @type private
     */
    bgwrap (prm) {
        try {
            if (true === comutl.isinc(prm, "Component")) {
                prm.style({ "position": "relative", "z-index": "-10" });
            }
            return this.innerComp("bgwrap", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * background component
     * height is synchronized with window height by auto
     * 
     * @param (component) background component
     * @return (component) background component
     * @type parameter
     */
    background (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                let ret = this.bgwrap().child();
                return (0 === ret.length) ? null : ret[0];
            }
            /* setter */
            this.bgwrap().child(prm);
	    cmputl.rstyle(prm, { 'position' : 'fixed' });
            let off = comutl.getsize(this.header().height());
	    off = (null !== off) ? '-' + off.toPixel() + 'px' : undefined;
            prm.config({ effect : new Synwin({ y_offset: off }) });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * height
     * 
     * @param (string (size)) height size
     * @param (dict) style option
     * @return (string) height size
     * @type parameter
     */
    height (prm, opt) {
        try {
            if (undefined === prm) {
                /* getter */
                return comutl.sizesum(this.header().height(), super.height());
            }
            /* setter */
            let set_hei = comutl.getsize(
                comutl.sizediff(prm, this.header().height())
            );
	    super.height((0 > set_hei.value()) ? prm : set_hei,opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * setter/getter header color
     * 
     * @param (mixed (color)) string: color name, #hex
     *                        array: [red, green, blue, alpha]
     * @param (option) style option
     * @return (string) color
     * @type parameter
     */
    mainColor (prm, opt) {
        try {
	    return this.header().baseColor(prm,opt);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    baseColor (prm,opt) {
        try {
            if (undefined !== prm) {
                this.background(
                    new mofron.class.Component({
                        baseColor: new ConfArg(prm,opt)
                    })
                );
            }
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
