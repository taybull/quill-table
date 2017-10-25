import Quill from 'quill';
import TableCell from './js/TableCellBlot'
import TableRow from './js/TableRowBlot'
import TableTrick from './js/TableTrick'
import Table from './js/TableBlot'
import Contain from './js/ContainBlot'
import './css/quill.table.css';

let Container = Quill.import('blots/container');

Container.order = [
    'list', 'contain',   // Must be lower
    'td', 'tr', 'table'  // Must be higher
];

Quill.register(TableCell, true);
Quill.register(TableRow, true);
Quill.register(Table, true);
Quill.register(Contain, true);

export {
    TableCell,
    TableRow,
    Table,
    Contain,
    TableTrick
}