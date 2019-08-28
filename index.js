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
     * @param (mixed) title parameter
     *                object: component option
     * @param (component) child component
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
     * @param (mixed) string/mofron-comp-text: app title
     * @param (mixed) string: path to app logo image
     *                mofron-comp-image: logo image
     * @return (mofron-comp-text) app title
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
     * @param (mofron-comp-header) header component
     * @return (mofron-comp-header) header component
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
     * @param (component) background wrapper component
     * @return (component) background wrapper component
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
     * @param (string (size)) height size
     * @param (option) style option
     * @return (string) height size
     * @type parameter
     */
    height (prm, opt) {
        try {
            if (undefined === prm) {
                /* getter */
                return mf.func.sizeSum(this.header().height(), super.height());
            }
            /* setter */
            let set_hei = mf.func.getSize(
                mf.func.sizeDiff(prm, this.header().height())
            );
            super.height((0 > set_hei.value()) ? [prm,opt] : [set_hei,opt]);
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
        try { return this.header().baseColor(prm,opt); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * background base color setter/getter
     *
     * @param (mixed (color)) string: color name, #hex
     *                        array: [red, green, blue, alpha]
     * @param (option) style option
     * @return (string) color
     * @type parameter
     */
    baseColor (prm) {
        try { return mf.func.cmpColor(this, 'background', [prm,opt]); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.comp.AppBase;
/* end of file */
