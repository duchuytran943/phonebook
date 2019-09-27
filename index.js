
/**
 * Sử dụng kiến thức đã học, tạo ra một ứng dụng danh bạ điện thoại, có các chức năng:
 * - Nhập dữ liệu contact (name, phone number)
 * - Sửa dữ liệu contact
 * - Xoá contact
 * - Tìm kiếm contact: có thể nhập vào tên (không dấu hoặc có dấu, chữ hoa hoặc chữ thường vẫn cho ra kết quả) hoặc 1 phần số điện thoại
 */
var readlineSync = require('readline-sync');
var fs = require('fs');

var contacts = [];
function loadData() {
    var fileContent = fs.readFileSync('./data.json', { encoding: 'utf8' });   // fileContent is a string
    // console.log(fileContent);
    contacts = JSON.parse(fileContent); //cover string to contacts object
    // console.log(contacts);
}

function showAllContacts() {
    console.log('+++++++++++++++++++++++++++++++++++++++++');
    for (var contact of contacts) {
        console.log('id: ' + contact.id + ' || ' + 'name: ' + contact.name + ' || ' + 'phone: ' + contact.phone);
    }
    console.log('+++++++++++++++++++++++++++++++++++++++++');
}


function showMenu() {
    console.log('0. Show all contact');
    console.log('1. Create new contact');
    console.log('2. Edit contact');
    console.log('3. Search contact');
    console.log('4. Erase contact ');
    console.log('5. Save and Exit');
    var option = readlineSync.question('> ');
    switch (option) {
        case "0":
            showAllContacts();
            showMenu();
            break;
        case "1":
            createNewContact();
            showMenu();
            break;
        case "2":
            editContact();
            showMenu();
            break;
        case "3":
            searchContact();
            showMenu();
            break;
        case "4":
            eraseContact();
            showMenu();
            break;
        case "5":
            saveAndExit();
            break;

        default:
            console.log('Wrong option');
            showMenu();
            break;
    }

}
function main() {
    loadData();
    showMenu();


}

main();

