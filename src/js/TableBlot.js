import Quill from 'quill';
import TableTrick from './TableTrick';
import TableRow from './TableRowBlot';
import ContainBlot from './ContainBlot';

let Container = Quill.import('blots/container');
let Parchment = Quill.import('parchment');

class Table extends ContainBlot {
    static create(value) {
        console.log('Table value here', value);
        let tagName = 'table';
        let split = value.split('|');
        let node = super.create(tagName);
        node.setAttribute('table_id', split[0]);
        // node.setAttribute('class', typeof split[1] != 'undefined' ? split[1] : '');
        return node;
    }

    format() {
        this.getAttribute('id');
    }

    formats() {
        // We don't inherit from FormatBlot
        const formats = {
            [this.statics.blotName]:
            this.domNode.getAttribute('table_id') + '|' + this.domNode.getAttribute('class') 
        }
        console.log('formats', formats);
        return formats;
    }

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

Table.blotName = 'table';
Table.tagName = 'table';
Table.scope = Parchment.Scope.BLOCK_BLOT;
Table.defaultChild = 'tr';
Table.allowedChildren = [TableRow];

export default Table;