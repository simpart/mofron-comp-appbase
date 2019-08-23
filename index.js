/**
 * @file   mofron-comp-appbase/index.js
 * @brief  common application component for mofron
 *         it makes easy to build page.
 * @author simpart
 */
const mf     = require("mofron");
const Header = require('mofron-comp-appheader');
const Image  = require('mofron-comp-image');
const Backgd = require('mofron-effect-backgd');
const Synwin = require('mofron-effect-syncwin');

mf.comp.AppBase = class extends mf.Component {
    /**
     * initialize component
     *
     * @param (string) title parameter
     * @param (Component) child component
     * @pmap title,child
     * @type private
     */
    constructor (po, p2) {
        try {
            super();
            this.name('AppBase');
            this.prmMap(['title', 'child']);
            this.prmOpt(po, p2);
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
            
            this.addChild(this.header());
            /* background area */
            this.addChild(this.bgwrap());
            
            /* contents */
            let conts = new mf.Component({ width : '100%' });
            this.addChild(conts);
            this.target(conts.target());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    /**
     * set app title (header text)
     *
     * @param (string/Text) app title
     * @param (string/Image) string: path to app logo image
     *                       Image: logo image
     * @return (Text) app title
     * @type parameter
     */
    title (prm, lg) {
        try {
            let ret = this.header().title(prm);
            if (undefined !== lg) {
                this.header().logo(lg);
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        } 
    }
    
    /**
     * app header
     * 
     * @param (Header) header component
     * @type parameter
     */
    header (prm) {
        try { return this.innerComp('header', prm, Header); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * background wrapper
     *
     * @param (Component) background wrapper component
     * @return (Component) background wrapper component
     * @type private
     */
    bgwrap (prm) {
        try {
            if (true === mf.func.isInclude(prm, 'Component')) {
                prm.option({
                    style : {
                        'position' : 'relative',
                        'z-index'  : '-10'
                    }
                });
            }
            return this.innerComp('bgwrap', prm, mf.Component);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * background component
     * height is synchronized with window height by auto
     * 
     * @param (Component) background component
     * @return (Component) background component
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
            let hrd_ofs = mf.func.getSize(this.header().height());
            if ( (true === mf.func.isInclude(hrd_ofs, 'Rem')) ||
                 (true === mf.func.isInclude(hrd_ofs, 'Pixel')) ) {
                hrd_ofs = parseInt('-' + hrd_ofs.toPxnum());
            } else {
                hrd_ofs = 0;
            }
            prm.option({
                effect : [ new Backgd(), new Synwin([true, true], ["0px", hrd_ofs + "px"]) ]
            });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * height
     * 
     * @param (string) height size
     * @return (string) height size
     * @type parameter
     */
    height (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return mf.func.sizeSum(this.header().height(), super.height());
            }
            /* setter */
	    opt = undefined;
	    if (true === Array.isArray(prm)) {
	        opt = prm[1];
		prm = prm[0];
	    }
            let set_hei = mf.func.getSize(
                mf.func.sizeDiff(prm, this.header().height())
            );
	    if (undefined !== opt) {
	        super.height((0 > set_hei.value()) ? [prm,opt] : [set_hei,opt]);
	    } else {
	        super.height((0 > set_hei.value()) ? prm : set_hei);
	    }
            super.height((0 > set_hei.value()) ? prm : set_hei);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * setter/getter header color
     * 
     * @param (string/Array) string: color,#hex
     *                       Array: r,g,b
     * @return (string) color
     * @type parameter
     */
    mainColor (prm) {
        try { return this.header().baseColor(prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * background base color setter/getter
     *
     * @param (string/Array) string: color,#hex
     *                       Array: r,g,b
     * @return (string) color
     * @type parameter
     */
    baseColor (prm) {
        try { return mf.func.cmpColor(this, 'background', prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.comp.AppBase;
/* end of file */
