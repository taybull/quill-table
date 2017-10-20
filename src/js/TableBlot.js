import Quill from 'quill';
import TableTrick from './TableTrick';
import TableRow from './TableRowBlot';

let Container = Quill.import('blots/container');
let Parchment = Quill.import('parchment');

class Table extends Container {
    static create(value) {
        // special adding commands - belongs somewhere else out of constructor
        if (value == 'append-row') {
            let blot = TableTrick.append_row();
            return blot;
        } else if (value == 'append-col') {
            let blot = TableTrick.append_col();
            return blot;
        } else if (value.includes('newtable_')) {
            let node = null;
            let sizes = value.split('_');
            let row_count = Number.parseInt(sizes[1])
            let col_count = Number.parseInt(sizes[2])
            let table_id = TableTrick.random_id();
            let table = Parchment.create('table', table_id);
            for (var ri = 0; ri < row_count; ri++) {
                let row_id = TableTrick.random_id();
                let tr = Parchment.create('tr', row_id);
                table.appendChild(tr);
                for (var ci = 0; ci < col_count; ci++) {
                    let cell_id = TableTrick.random_id();
                    value = table_id + '|' + row_id + '|' + cell_id;
                    let td = Parchment.create('td', value);
                    tr.appendChild(td);
                    let p = Parchment.create('block');
                    td.appendChild(p);
                    let br = Parchment.create('break');
                    p.appendChild(br);
                    node = p;
                }
            }
            let leaf = quill.getLeaf(quill.getSelection()['index']);
            let blot = leaf[0];
            let top_branch = null;
            for (; blot != null && !(blot instanceof Container || blot instanceof Scroll);) {
                top_branch = blot
                blot = blot.parent;
            }
            blot.insertBefore(table, top_branch);
            return node;
        } else {
            // normal table
            let tagName = 'table';
            let node = super.create(tagName);
            node.setAttribute('table_id', value);
            return node;
        }
    }

    optimize() {
        console.log("OPTIMIZE start");
        super.optimize();
        let next = this.next;
        if (next != null && next.prev === this &&
            next.statics.blotName === this.statics.blotName &&
            next.domNode.tagName === this.domNode.tagName &&
            next.domNode.getAttribute('table_id') === this.domNode.getAttribute('table_id')) {
            next.moveChildren(this);
            next.remove();
        }
        console.log(quill.editor.getDelta());
        console.log("OPTIMIZE end");
    }

}

Table.blotName = 'table';
Table.tagName = 'table';
Table.scope = Parchment.Scope.BLOCK_BLOT;
Table.defaultChild = 'tr';
Table.allowedChildren = [TableRow];

export default Table;