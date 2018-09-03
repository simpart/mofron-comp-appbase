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
    constructor (po, p2) {
        try {
            super();
            this.name('AppBase');
            this.prmMap('title', 'child');
            this.prmOpt(po, p2);
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
    initDomConts () {
        try {
            super.initDomConts();
            
            this.addChild(this.header());
            
            /* background area */
            this.target().addChild(this.getBgTarget());
            
            /* contents */
            let conts = new mf.Component({
                width : '100%'
            });
            this.addChild(conts);
            this.target(conts.target());
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }


    title (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return this.header().title();
            }
            /* setter */
            this.header().execOption({
                title : prm
            });
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
            if (true !== mf.func.isInclude(prm, 'Component')) {
                throw new Error('invalid parameter');
            }
            prm.execOption({
                effect : [
                    new Backgd(),
                    new Synwin(false, true)
                ]
            });
            
            this.switchTgt(
                this.getBgTarget(),
                (abs) => {
                    try {
                        if (null === abs.background()) {
                            abs.child([prm]);
                        } else {
                            abs.updChild(abs.background(), prm);
                        }
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                },
                this
            );
            this.m_backgd = prm;
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
            let set_hei = mf.func.sizeDiff(prm, this.header().height());
            if (0 > set_hei.value()) {
                throw new Error('invalid parameter');
            }
            super.height(set_hei);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    mainColor (prm) {
        try {
            return this.header().baseColor(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.comp.AppBase;
/* end of file */
