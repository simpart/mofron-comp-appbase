/**
 * @file   mofron-comp-appbase/index.js
 * @author simpart
 */
let mf = require("mofron");
let Header = require('mofron-comp-apphdr');

/**
 * @class mofron.comp.AppBase
 * @brief application base page
 */
mf.comp.AppBase = class extends mf.Component {
    
    constructor (po) {
        try {
            super();
            this.name('AppBase');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize vdom
     * 
     * @param prm : (string) text contents
     */
    initDomConts (prm) {
        try {
            super.initDomConts();
            this.addChild(this.header());
            this.addChild(this.contents());
            mf.func.addResizeWin(this.resizeEvent);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    themeConts () {
        try {
            let hdr = this.theme().component('mofron-comp-apphdr');
            if (null !== hdr) {
                this.header(hdr);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    title (ttl) {
        try {
            if (undefined === ttl) {
                /* getter */
                return this.header().title();
            }
            this.header().title(ttl);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    header (hdr) {
        try {
            if (undefined === hdr) {
                /* getter */
                if (undefined === this.m_header) {
                    this.header(new Header());
                }
                return this.m_header;
            }
            /* setter */
            if (true !== mf.func.isInclude(hdr, 'Ttlhdr')) {
                throw new Error('invalid parameter');
            }
            hdr.url((null === hdr.url()) ? './' : undefined);
            hdr.bind(false);
            if ( (true === this.target().isPushed()) &&
                 (undefined !== this.m_header) ) {
                this.updChild(this.header(), hdr);
            }
            this.m_header = hdr;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    contents (cnt) {
        try {
            if (undefined === cnt) {
                /* getter */
                if (undefined === this.m_conts) {
                    this.contents(new mf.Component());
                }
                return this.m_conts;
            }
            /* setter */
            cnt.execOption({
                style : {
                    height : (window.innerHeight - this.header().height())+ 'px'
                }
            });
            this.m_conts = cnt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    resizeEvent () {
        try {
            this.contents().style({
                height : (window.innerHeight - lgn.header().height())+ 'px'
            });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.comp.AppBase;
