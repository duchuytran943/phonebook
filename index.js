
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

function searchContact() {
    var valSearch = readlineSync.question('> Enter name or phone: ');
    search(contacts, valSearch);
    showMenu();
}
function search(ob, q) {
    if (!isNaN(q)) {
        q = Number(q);
        var arr = new Array();
        for (x of ob) {
            if (Number(x.phone).toString().indexOf(Number(q).toString()) >= 0) {

                arr.push(x);

            }
        }
        showContacts(arr);
    } else {
        q = q.toString();
        let arr = new Array();
        for (x of ob) {
            if (change_alias(x.name).toLowerCase().indexOf(change_alias(q).toLowerCase()) >= 0) {
                arr.push(x);
            }
        }
        showContacts(arr);
    }

}
function change_alias(alias) {
    var str = alias;
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.trim();
    return str;
}

function showContacts(ob) {
    console.log('============= SEARCH RESULTS =============');
    for (x of ob) {
        console.log("id: " + x.id + " || name: " + x.name + " || phone: " + x.phone);
    }
}

function eraseContact() {
    var idEarse = readlineSync.question('> Enter ID need earse: ');

    contacts.splice(idEarse, 1);

    //Reorder id value after deletion.
    for (idEarse; idEarse < contacts.length; idEarse++) {
        contacts[idEarse].id = idEarse;
    }
    showAllContacts();
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

