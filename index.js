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
            this.addChild(this.contents());
            this.target(this.contents().target());
            
            /* sync height-length with window */
            mf.func.addResizeWin(
                (p) => {
                    try {
                        bg.height(
                            window.innerHeight - p.header().height()
                        );
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
    
    addLayout (lo) {
        try {
            return this.child()[2].addLayout(lo);
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
    
    contents (cnt) {
        try {
            if (undefined === cnt) {
                /* getter */
                if (3 > this.child().length) {
                    return new mf.Component({width : '100%'});
                }
                return this.child()[2];
            }
            /* setter */
            this.addChild(cnt);
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
/* end of file */
