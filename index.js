import Quill from 'quill';
import TableCell from './src/js/TableCellBlot'
import TableRow from './src/js/TableRowBlot'
import TableTrick from './src/js/TableTrick'
import Table from './src/js/TableBlot'
import Contain from './src/js/ContainBlot'
import './src/css/quill.table.css';

let Container = Quill.import('blots/container');

Container.order = [
    'list', 'contain',   // Must be lower
    'td', 'tr', 'table'  // Must be higher
];

Quill.register(TableCell, true);
Quill.register(TableRow, true);
Quill.register(Table, true);
Quill.register(Contain, true);

export default {
    TableCell,
    TableRow,
    Table,
    Contain,
    TableTrick
}