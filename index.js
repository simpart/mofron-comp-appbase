/**
 * @file   mofron-comp-appbase/index.js
 * @brief  common application component for mofron
 * @author simpart
 */
let mf = require("mofron");
let Header = require('mofron-comp-apphdr');

/**
 * @class mofron.comp.AppBase
 * @brief common application component class
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
     * @param prm (text, mofron-comp-Text) title
     */
    initDomConts (prm) {
        try {
            super.initDomConts();
            
            this.addChild(this.header());
            
            /* background */
            let bg = new mf.Component({
                style  : { 'position' : 'fixed' },
                height : window.innerHeight - this.header().height()
            });
            this.addChild(bg);
            
            /* contents */
            let conts = new mf.Component({width : '100%'});
            this.addChild(conts);
            this.target(conts.target());
            
            /* sync height-length with window */
            mf.func.addResizeWin(
                (p) => {
                    try {
                        let set_hei = window.innerHeight - p.header().height();
                        bg.height(set_hei);
                        
                        if (true === p.winHeight()) {
                            p.getChild(true)[2].height(set_hei);
                        }
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                },
                this
            );
            
            if (undefined !== prm) {
                this.title(prm);
            }
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
            return this.header().title(ttl);
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
    
    hdrOption (opt) {
        try {
            this.header().execOption(opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    background (val) {
        try {
            let bgd = this.getChild(true)[1];
            if (undefined === val) {
                /* getter */
                return (0 === bgd.child().length) ? null : bgd.child()[0];
            } 
            /* setter */
            if (true !== mf.func.isInclude(val, 'Component')) {
                throw new Error('invalid parameter');
            }
            val.size('100%','100%');
            bgd.addChild(val);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    winHeight (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_winhei) ? false : this.m_winhei;
            }
            if ('boolean' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            /* setter */
            let conts = this.getChild(true)[2];
            if (true === prm) {
                this.conts.height(
                    window.innerHeight - this.header().height()
                );
            } else {
                this.conts().height(null);
            }
            this.m_winhei = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    color (clr, c2) {
        try {
            if ((undefined === clr) && (undefined === c2)) {
                /* getter */
                return this.header().color();
            }
            /* setter */ 
            /* set header color */
            if (undefined !== clr) {
                this.header().color(clr);
            }
            if (undefined !== c2) {
                let bg = this.getChild(true)[1];
                bg.width('100%');
                bg.color(c2);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.comp.AppBase;
/* end of file */
