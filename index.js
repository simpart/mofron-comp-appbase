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
     * initialize dom contents
     * 
     * @param prm : (string) text contents
     */
    initDomConts (prm) {
        try {
            super.initDomConts();
            this.addChild(this.header());
            
            let hei = window.innerHeight - this.header().height();
            /* background */
            let bg = new mf.Component({
                style : { 'position' : 'fixed' },
                height : hei
            });
            this.addChild(bg);
            
            /* contents */
            let conts = new mf.Component({
                height : hei
            });
            this.addChild(conts);
            this.target(conts.target());
            
            mf.func.addResizeWin(
                (p) => {
                    try {
                        let hei = window.innerHeight - p.header().height();
                        bg.height(hei);
                        conts.height(hei);
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                },
                this
            );
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
            if (undefined !== this.m_conts) {
                this.updChild(this.m_conts, cnt);
            }
            this.m_conts = cnt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    background (val) {
        try {
            if (undefined === val) {
                /* getter */
                return this.child()[1];
            } 
            /* setter */
            if (true !== mf.func.isInclude(val, 'Component')) {
                throw new Error('invalid parameter');
            }
            val.size('100%','100%');
            this.child()[1].addChild(val);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    color (clr) {
        try {
            if (undefined === clr) {
                /* getter */
                return this.header().color();
            }
            /* setter */ 
            /* set header color */
            this.header().color(clr);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.comp.AppBase;
