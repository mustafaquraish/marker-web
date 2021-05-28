import { sum } from './utils'

export function isHidden(item, searchTerm) {
    
    let itemName = item.username.toLowerCase();
    if (!searchTerm.startsWith(':') &&
        !searchTerm.startsWith('.') &&
        !searchTerm.startsWith('>') &&
        !searchTerm.startsWith('<') &&
        !searchTerm.startsWith('=')) 
    {
        return !itemName.includes(searchTerm.toLowerCase())
    }

    const command = searchTerm[0];
    const option = searchTerm.slice(1);
    
    if (option == "") { return false;}
    
    const sumMarks = sum(item.marks);

    if (command == ":" || command == ".") {
        let meta = "";
        if (!item.marks) meta += "unmarked"
        else if (item.marks.length === 0) { meta += "failed" }
        return !meta.includes(option.toLowerCase())
    } 


    const val = parseInt(option);
    if (command == ">") { return !(sumMarks > val); }
    if (command == "=") { return !(sumMarks == val); }
    if (command == "<") { return !(sumMarks < val); }
}