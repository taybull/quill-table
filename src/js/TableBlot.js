import Quill from 'quill';
import TableTrick from './TableTrick';
import TableRow from './TableRowBlot';
import ContainBlot from './ContainBlot';

let Container = Quill.import('blots/container');
let Parchment = Quill.import('parchment');
const ATTRIBUTES = [
    'class'
  ];
class Table extends ContainBlot {
    
    static create(value) {
        console.log('Table value here', value);
        let tagName = 'table';
        let node = super.create(tagName);
        if (typeof value === 'string') {
            node.setAttribute('table_id', value);
          }
        return node;
    }

    format() {
        this.getAttribute('id');
    }


    // format(name, value) {
    //     if (ATTRIBUTES.indexOf(name) > -1) {
    //       if (value) {
    //         this.domNode.setAttribute(name, value);
    //       } else {
    //         this.domNode.removeAttribute(name);
    //       }
    //     } else {
    //       super.format(name, value);
    //     }
    // }

    // static formats(domNode) {
    //     return ATTRIBUTES.reduce(function(formats, attribute) {
    //       if (domNode.hasAttribute(attribute)) {
    //         formats[attribute] = domNode.getAttribute(attribute);
    //       }
    //       return formats;
    //     }, {});
    //   }
    

    optimize(context) {
        super.optimize(context);
        let next = this.next;
        if (next != null && next.prev === this &&
            next.statics.blotName === this.statics.blotName &&
            next.domNode.tagName === this.domNode.tagName &&
            next.domNode.getAttribute('table_id') === this.domNode.getAttribute('table_id')) {
            next.moveChildren(this);
            next.remove();
        }
    }

    insertBefore(childBlot, refBlot) {
        if (this.statics.allowedChildren != null && !this.statics.allowedChildren.some(function (child) {
                return childBlot instanceof child;
            })) {
            let newChild = Parchment.create(this.statics.defaultChild, TableTrick.random_id());
            newChild.appendChild(childBlot);
            childBlot = newChild;
        }
        super.insertBefore(childBlot, refBlot)
    }

}

class NoBorderTable extends Table {

}

//Table.className = 'border';
Table.blotName = 'table';
Table.tagName = 'table';
Table.scope = Parchment.Scope.BLOCK_BLOT;
Table.defaultChild = 'tr';
Table.allowedChildren = [TableRow];


//NoBorderTable.className = 'noborder';
NoBorderTable.blotName = 'noborder';
NoBorderTable.tagName = 'table';
NoBorderTable.scope = Parchment.Scope.BLOCK_BLOT;
NoBorderTable.defaultChild = 'tr';
NoBorderTable.allowedChildren = [TableRow];

export {Table, NoBorderTable};