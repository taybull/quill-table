import Quill from 'quill';
import Delta from 'quill-delta';
import TableCell from './js/TableCellBlot';
import TableRow from './js/TableRowBlot';
import {Table, NoBorderTable} from './js/TableBlot';
import Contain from './js/ContainBlot';
import './css/quill.table.css';
import TableTrick from "./js/TableTrick";

let Container = Quill.import('blots/container');

Container.order = [
    'list', 'contain',   // Must be lower
    'td', 'tr', 'table'  // Must be higher
];

class TableModule {
    constructor(quill, options) {
        let toolbar = quill.getModule('toolbar');
        toolbar.addHandler('table', function (value) {
            console.log('toolbar.addHandler', value);
            return TableTrick.table_handler(value, quill);
        });
        let clipboard = quill.getModule('clipboard');
        clipboard.addMatcher('TABLE', function (node, delta) {
            console.log('addMatcher.TABLE node', node);
            console.log('addMatcher.TABLE delta', delta);

            let id = "";
            try {
                console.log('addMatcher.TABLE node.getAttribute table_id', node.getAttribute('table_id'));
                id = node.getAttribute('table_id');
                id = id + "|" + node.getAttribute('class');
                console.log('addMatcher.TABLE node.getAttribute class', node.getAttribute('class'));
            } catch(error) {
                console.log('error', error);
            }
            
            return delta;
            // return delta.compose(new Delta().retain(delta.length(), {
            //     table: node.getAttribute('table_id') + '|' + node.getAttribute('class')
            // }));
        });
        
        clipboard.addMatcher('TR', function (node, delta) {
            console.log('addMatcher.TR node', node);
            console.log('addMatcher.TR delta', delta);
            return delta;
        });
        clipboard.addMatcher('TD', function (node, delta) {
            console.log('addMatcher.TD node', node);
            console.log('addMatcher.TD delta', delta);
            
            const td = delta.compose(new Delta().retain(delta.length(), {
                td: node.getAttribute('table_id') + '|' + node.getAttribute('row_id') + '|' + node.getAttribute('cell_id')
            }));
            console.log('addMatcher.TD td', td);
            return td;
        });
    }
}

module.exports = {
    Table,
    NoBorderTable,
    TableRow,
    TableCell,
    Contain,
    TableModule
};