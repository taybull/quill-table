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

export {
    TableCell,
    TableRow,
    Table,
    Contain,
    TableTrick
}