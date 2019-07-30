/**
 * @file   mofron-comp-appbase/index.js
 * @brief  common application component for mofron
 * @author simpart
 */
const mf     = require("mofron");
const Header = require('mofron-comp-appheader');
const Image  = require('mofron-comp-image');
const Backgd = require('mofron-effect-backgd');
const Synwin = require('mofron-effect-syncwin');

/**
 * @class mofron.comp.AppBase
 * @brief common application component class
 */
mf.comp.AppBase = class extends mf.Component {
    /**
     * initialize component
     *
     * @param p1 (hash object) set option
     * @param p1 (string) set app title
     * @param p2 (Component Object) child component
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
     * @note private method
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
     * setter/getter app title (header text)
     *
     * @param p1 (string) app title
     * @param p1 (undefined) call as app title
     * @return (string) app title
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
     * setter/getter app header
     */
    header (prm) {
        try { return this.innerComp('header', prm, Header); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * setter/getter background wrapper
     *
     * @param p1 (Component) background wrapper component
     * @param p1 (undefined) call ass getter
     * @return (Component) background wrapper component
     * @note private method
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
     * setter/getter background component
     * height is synchronized with window height by auto
     * 
     * @param p1 (Component) background component
     * @param p1 (undefined) call ass getter
     * @return (Component) background component
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
                effect : [ new Backgd(), new Synwin([false, true], [0, hrd_ofs]) ]
            });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    height (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return mf.func.sizeSum(this.header().height(), super.height());
            }
            /* setter */
            let set_hei = mf.func.getSize(
                mf.func.sizeDiff(prm, this.header().height())
            );
            super.height((0 > set_hei.value()) ? prm : set_hei);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * setter/getter header color
     *
     * @param p1 (string) color value (css)
     * @param p1 (Array) [red(0-255), green(0-255), blue(0-255)]
     * @param p1 (undefined) call as getter
     * @return (string) color value (css)
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
     * @param p1 (string) color value (css)
     * @param p1 (Array) [red(0-255), green(0-255), blue(0-255)]
     * @param p1 (undefined) call as getter
     * @return (string) color value (css)
     */
    baseColor (prm) {
        try {
            let cnt = this.getChild(true)[2]; 
            if (undefined === prm) {
                cnt.style('background');
            }
            mf.func.cmpColor(cnt, 'background', prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.comp.AppBase;
/* end of file */
