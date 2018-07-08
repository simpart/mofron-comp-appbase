/**
 * @file   mofron-comp-appbase/index.js
 * @brief  common application component for mofron
 * @author simpart
 */
let mf = require("mofron");
let Header = require('mofron-comp-appheader');
let Image= require('mofron-comp-image');

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
    initDomConts (ttl) {
        try {
            super.initDomConts();
            
            if (undefined !== ttl) {
                this.header().title(ttl);
            }
            this.addChild(this.header());
            
            /* background area */
            this.target().addChild(this.getBgTarget());
            
            /* contents */
            let conts = new mf.Component({width : '100%'});
            this.addChild(conts);
            this.target(conts.target());
            
            this.height(window.innerHeight);
            
            /* sync height-length with window */
            mf.func.rsizWinEvent(
                (app) => {
                    try {
                        app.background().height(window.innerHeight - app.header().height());
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
    
    header () {
        try {
            if (undefined === this.m_header) {
                this.m_header = new Header({});
            }
            return this.m_header;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getBgTarget () {
        try {
            if (undefined === this.m_bgtgt) {
                this.m_bgtgt = new mf.Dom({
                    tag       : 'div',
                    component : this,
                    style     : {
                        'position' : 'fixed',
                        'width'    : '100%'
                    }
                });
            }
            return this.m_bgtgt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    background (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_backgd) ? null : this.m_backgd;
            }
            /* setter */
            if ('string' === typeof prm) {
                prm = new Image(prm);
            } else if (true !== mf.func.isInclude(prm, 'Image')) {
                throw new Error('invalid parameter');
            }
            prm.size('100%',window.innerHeight - this.header().height());
            
            let tgt_buf = this.target();
            this.target(this.getBgTarget());
            
            if (null === this.background()) {
                this.addChild(prm);
            } else {
                this.updChild(this.background(), prm);
            }
            this.m_backgd = prm;
            this.target(tgt_buf);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    height (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                let hdr = this.header().height();
                let cnt = super.height();
                if (('number' === typeof hdr) && (cnt === typeof cnt)) {
                    return hdr + cnt;
                }
                return cnt;
            }
            /* setter */
            if ('number' === typeof prm) {
                if (prm < this.header().height()) {
                    throw new Error('invalid parameter');
                }
                prm = prm - this.header().height();
            }
            super.height(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.comp.AppBase;
/* end of file */
