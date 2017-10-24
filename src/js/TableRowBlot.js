import Quill from 'quill';
import TableCell from './TableCellBlot';
import ContainBlot from './ContainBlot';
import TableTrick from './TableTrick'

let Container = Quill.import('blots/container');
let Parchment = Quill.import('parchment');

class TableRow extends ContainBlot {
    static create(value) {
        let tagName = 'tr';
        let node = super.create(tagName);
        node.setAttribute('row_id', value ? value : TableTrick.random_id());
        return node;
    }

    optimize(context) {
        if (this.children.length === 0) {
            if (this.statics.defaultChild != null) {
                var child = Parchment.create(this.statics.defaultChild, [this.parent.domNode.getAttribute('table_id'), this.domNode.getAttribute('row_id'), TableTrick.random_id()].join('|'));
                this.appendChild(child);
                child.optimize(context);
            }
            else {
                this.remove();
            }
        }
        let next = this.next;
        if (next != null && next.prev === this &&
            next.statics.blotName === this.statics.blotName &&
            next.domNode.tagName === this.domNode.tagName &&
            next.domNode.getAttribute('row_id') === this.domNode.getAttribute('row_id')) {
            next.moveChildren(this);
            next.remove();
        }
    }

    insertBefore(childBlot, refBlot) {
        if (this.statics.allowedChildren != null && !this.statics.allowedChildren.some(function (child) {
                return childBlot instanceof child;
            })) {
            let newChild = Parchment.create(this.statics.defaultChild, [refBlot.domNode.getAttribute('table_id'), this.domNode.getAttribute('row_id'), TableTrick.random_id()].join('|'));
            newChild.appendChild(childBlot);
            childBlot = newChild;
        }
        super.insertBefore(childBlot)
    }

    replace(target) {
        if (target.statics.blotName !== this.statics.blotName) {
            let item = Parchment.create(this.statics.defaultChild, [this.domNode.parent.getAttribute('table_id'), this.domNode.getAttribute('row_id'), TableTrick.random_id()].join('|'));
            target.moveChildren(item, this);
            this.appendChild(item);
        }
        if (target.parent == null) return;
        super.replace(target)
    }
}

TableRow.blotName = 'tr';
TableRow.tagName = 'tr';
TableRow.scope = Parchment.Scope.BLOCK_BLOT;
TableRow.defaultChild = 'td';
TableRow.allowedChildren = [TableCell];

export default TableRow;