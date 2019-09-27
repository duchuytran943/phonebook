
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
    console.log('+++++++++++++++ CONTACT LISTS +++++++++++++++');
    for (var contact of contacts) {
        console.log('id: ' + contact.id + ' || ' + 'name: ' + contact.name + ' || ' + 'phone: ' + contact.phone);
    }
    console.log('+++++++++++++++++++++++++++++++++++++++++');
}


function createNewContact() {
    console.log('ADD NEW CONTACT: ');
    // console.log('Enter new phone: ');
    var phone = readlineSync.question('> Enter new phone number: ');
    // console.log('Enter name: ');
    var name = readlineSync.question('> Enter name: ');
    /**
     * 
     * Next, we push new object contact to contacts arr.
     * id of new contacts = (value of id of ending contact) + 1;
     *  ending contact => contacts[contacts.length -1];
     *  value of id of ending contact => contacts[contacts.length -1].id;
     * id of new contacts => (contacts[contacts.length -1].id) + 1;
     */

    contacts.push({ id: contacts[contacts.length - 1].id + 1, name: name, phone: phone });
}

function editContact() {
    /**
     * Selected id need edit.
     */
    var idSelected = Number(readlineSync.question('> Selected ID contact need edit:  '));
    // console.log(typeof(idSelected));
    var oldContact = contacts[idSelected];
    // console.log(oldContact);
    var phone = readlineSync.question('> Edit phone number: ' + oldContact.phone + '  =>  ');
    var name = readlineSync.question('> Edit name: ' + oldContact.name + '  =>  ');
    // console.log(name, phone);
    oldContact.phone = phone;
    oldContact.name = name;
    // console.log(oldContact);
}

function showMenu() {
    console.log('==================================================');
    console.log('1. Show all contact');
    console.log('2. Create new contact');
    console.log('3. Edit contact');
    console.log('4. Search contact');
    console.log('5. Erase contact ');
    console.log('0. Save and Exit');
    var option = readlineSync.question('> ');
    switch (option) {
        case "1":
            showAllContacts();
            showMenu();
            break;
        case "2":
            createNewContact();
            showMenu();
            break;
        case "3":
            showAllContacts();
            editContact();
            showMenu();
            break;
        case "4":
            searchContact();
            showMenu();
            break;
        case "5":
            eraseContact();
            showMenu();
            break;
        case "0":
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

