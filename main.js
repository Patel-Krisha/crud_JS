window.onload = displayData;
let editId = '';
const getErrorId = document.getElementById('error-msg');
const dateInput = document.forms[0].employeeBirthday;
dateInput.max = new Date().toISOString().split('T')[0];

document.getElementById('submitButton').addEventListener('click', function (e) {
  e.preventDefault();
  //------------------------get Name & validations----------------------------------------
  const empName = document.forms[0].employeeName.value;
  let errorMessage = '';
  if (empName === '') {
    errorMessage = 'Please enter a name.';
  } else if (empName.length < 4 || empName.length > 20) {
    errorMessage = 'Name field should be between 4 to 20 characters.';
  } else if (!empName.match(/^[A-Za-z]+$/)) {
    errorMessage = 'Name field including only alphanumeric characters.';
  }
  if (errorMessage) {
    getErrorId.innerHTML = errorMessage;
    document.forms[0].employeeName.focus();
    return false;
  }
  //------------------------get birth date & validations----------------------------------------
  const empBirthday = document.forms[0].employeeBirthday.value;
  errorMessage = '';
  if (empBirthday === '') {
    errorMessage = 'Please enter your birthDate.';
  }
  if (errorMessage) {
    getErrorId.innerHTML = errorMessage;
    document.forms[0].employeeBirthday.focus();
    return false;
  }

  //------------------------get Email & validations----------------------------------------
  const empEmail = document.forms[0].employeeEmail.value;
  if (empEmail === '') {
    errorMessage = 'Please enter your mail.';
  } else if (!empEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    errorMessage = 'You have entered an invalid email address!';
  }
  if (errorMessage) {
    getErrorId.innerHTML = errorMessage;
    document.forms[0].employeeEmail.focus();
    return false;
  }

  //------------------------get Phone no. & validations----------------------------------------
  const empPhoneNo = document.forms[0].employeePhoneNo.value;
  if (empPhoneNo === '') {
    errorMessage = 'Please enter your phone Number.';
  } else if (isNaN(empPhoneNo)) {
    errorMessage = 'Your Phone number contains digits only.';
  } else if (empPhoneNo.length != 10) {
    errorMessage = 'Phone number contains 10 digits.';
  }
  if (errorMessage) {
    getErrorId.innerHTML = errorMessage;
    document.forms[0].employeePhoneNo.focus();
    return false;
  }
  //-----------to get selected value of check box---------------------------
  const selectedHobbies = [];
  const hobbyInputs = document.forms[0].employeeHobby;

  for (let i = 0; i < hobbyInputs.length; i++) {
    if (hobbyInputs[i].checked) {
      selectedHobbies.push(hobbyInputs[i].value);
    }
  }
  console.log('Hobbies :', selectedHobbies);

  let selectedGender;
  const genderInputs = document.forms[0].employeeGender;

  for (let i = 0; i < genderInputs.length; i++) {
    if (genderInputs[i].checked) {
      selectedGender = genderInputs[i].value;
      break;
    }
  }

  console.log('Gender :', selectedGender);
  console.log(editId);
  if (editId) {
    const employeeUpdated = {
      name: empName,
      gender: selectedGender,
      birthDate: empBirthday,
      email: empEmail,
      phoneNumber: empPhoneNo,
      hobby: selectedHobbies,
    };
    updateRow(employeeUpdated, editId);
  } else {
    const employee = {
      uniqueId: uniqueIdGenerator(),
      name: empName,
      gender: selectedGender,
      birthDate: empBirthday,
      email: empEmail,
      phoneNumber: empPhoneNo,
      hobby: selectedHobbies,
    };
    addData(employee);
  }
});
/*------------------------get data from the local storage-----------------------*/
function getDataFromLocalStorage() {
  const storageData = JSON.parse(localStorage.getItem('emp_obj')) || [];
  return storageData;
}
/*------------------------set data in local storage-----------------------*/
function setDataInLocalStorage(setInLocalStorage) {
  localStorage.setItem('emp_obj', JSON.stringify(setInLocalStorage));
}

/*------------------------For storing data in local storage-----------------------*/

function addData(employee) {
  const existingData = getDataFromLocalStorage();
  //------------------------For duplication of mail -----------------------
  const empEmail = document.forms[0].employeeEmail.value;

  if (existingData.some((emp) => emp.email === empEmail)) {
    getErrorId.innerHTML = 'This email is already in use. Please enter a valid email.';
    document.forms[0].employeeEmail.focus();
    return false;
  }
  //------------------------store data in local storage-----------------------
  const finalData = existingData.concat(employee);
  setDataInLocalStorage(finalData);
  const getTblId = document.getElementById('basicTableId');
  addNewRow(getTblId, employee);
  
  clearForm();
}

/*------------------------For display the data in table format (Basic format)-----------------------*/
function displayData() {
  const basicTableHeading = document.createElement('h1');
  const basicTableHeadingText = document.createTextNode('Basic Table');
  basicTableHeading.appendChild(basicTableHeadingText);
  basicTableHeading.style.textAlign = 'center';
  document.body.appendChild(basicTableHeading);

  const basicTable = document.createElement('table');
  basicTable.setAttribute('id', 'basicTableId');
  basicTable.style.padding = '15px';
  basicTable.style.tableLayout = 'fixed';
  basicTable.style.borderSpacing = '8px';
  basicTable.style.textAlign = 'center';
  basicTable.style.justifyContent = 'center';

  const headingForId = document.createElement('th');
  const headingForIdText = document.createTextNode('Id');
  headingForId.appendChild(headingForIdText);
  styleOfTableHeader(headingForId);
  basicTable.appendChild(headingForId);

  const headingForName = document.createElement('th');
  const headingForNameText = document.createTextNode('Name');
  headingForName.appendChild(headingForNameText);
  styleOfTableHeader(headingForName);
  basicTable.appendChild(headingForName);

  const headingForGender = document.createElement('th');
  const headingForGenderText = document.createTextNode('Gender');
  headingForGender.appendChild(headingForGenderText);
  styleOfTableHeader(headingForGender);
  basicTable.appendChild(headingForGender);

  const headingForBirthDate = document.createElement('th');
  const headingForBirthDateText = document.createTextNode('Date of Birth');
  headingForBirthDate.appendChild(headingForBirthDateText);
  styleOfTableHeader(headingForBirthDate);
  basicTable.appendChild(headingForBirthDate);

  const headingForEmail = document.createElement('th');
  const headingForEmailText = document.createTextNode('E-mail');
  headingForEmail.appendChild(headingForEmailText);
  styleOfTableHeader(headingForEmail);
  basicTable.appendChild(headingForEmail);

  const headingForMobileNo = document.createElement('th');
  const headingForMobileNoText = document.createTextNode('Mobile Number');
  headingForMobileNo.appendChild(headingForMobileNoText);
  styleOfTableHeader(headingForMobileNo);
  basicTable.appendChild(headingForMobileNo);

  const headingForHobbies = document.createElement('th');
  const headingForHobbiesText = document.createTextNode('Hobbies');
  headingForHobbies.appendChild(headingForHobbiesText);
  styleOfTableHeader(headingForHobbies);
  basicTable.appendChild(headingForHobbies);

  const existingData = getDataFromLocalStorage();

  existingData.forEach((rowData) => {
    addNewRow(basicTable, rowData);
  });
  document.body.appendChild(basicTable);
  //------------------------ADVANCE TABLE-----------------------------------
  const advanceTableHeading = document.createElement('h1');
  const advanceTableHeadingText = document.createTextNode('Advance Table');
  advanceTableHeading.appendChild(advanceTableHeadingText);
  advanceTableHeading.style.textAlign = 'center';
  document.body.appendChild(advanceTableHeading);

  const advanceTable = document.createElement('table');
  advanceTable.setAttribute('id', 'advanceTableId');
  advanceTable.style.padding = '15px';
  advanceTable.style.tableLayout = 'fixed';
  advanceTable.style.borderSpacing = '8px';
  advanceTable.style.textAlign = 'center';
  advanceTable.style.justifyContent = 'center';

  document.body.appendChild(advanceTable);


  addInAdvanceTable(existingData);

  document.body.appendChild(advanceTable);
}
//----------------------------For add data in advanced table-------------------------------------
function addInAdvanceTable(existingData) {
  const advanceTable = document.getElementById('advanceTableId');

  // Create data columns
  const dataRows = [];
  existingData.forEach((rowData) => {
    for (const key in rowData) {
      if (!dataRows[key]) {
        dataRows[key] = advanceTable.insertRow(-1);
        const headerCell = document.createElement('th');
        headerCell.appendChild(document.createTextNode(key));
        dataRows[key].appendChild(headerCell);
        styleOfTableHeader(headerCell);
      }

      const cell = dataRows[key].insertCell();
      cell.innerHTML = rowData[key];
      cell.style.padding = '5px';
      cell.style.backgroundColor = '#f2f2f2';
    }
  });

  // Create buttons row
  const buttonsRow = advanceTable.insertRow(-1);
  for (const key in existingData[0]) {
    // Add empty cell for each column
    const emptyCell = buttonsRow.insertCell();
    
    // Add UPDATE button
    const updateButton = document.createElement('button');
    const updateButtonText = document.createTextNode('Update');
    updateButton.style.padding = '5px';
    updateButton.appendChild(updateButtonText);
    emptyCell.appendChild(updateButton);

    updateButton.onclick = function () {
      // Handle update logic here using key as the identifier
      // You may want to pass this identifier to your update function
      const rowData = existingData.find(item => item[key]);
      if (rowData) {
        updateForm(rowData.uniqueId);
      }
    };

    // Add DELETE button
    const deleteButton = document.createElement('button');
    const deleteButtonText = document.createTextNode('Delete');
    deleteButton.style.padding = '5px';
    deleteButton.appendChild(deleteButtonText);
    emptyCell.appendChild(deleteButton);

    deleteButton.onclick = function () {
      // Handle delete logic here using key as the identifier
      // You may want to pass this identifier to your delete function
      const rowData = existingData.find(item => item[key]);
      if (rowData) {
        deleteRow(advanceTable, rowData.uniqueId);
      }
    };
  }
}


//-------------------------ADD NEW ROW DATA------------------------------------------
function addNewRow(basicTable, rowData) {
  if (rowData) {
    const newRow = basicTable.insertRow(-1);
    for (const key in rowData) {
      const cell = newRow.insertCell();
      cell.innerHTML = rowData[key];
      cell.style.padding = '5px';
      cell.style.backgroundColor = '#f2f2f2';
    }
    const deleteButton = document.createElement('button');
    const deleteButtonText = document.createTextNode(' Delete');
    deleteButton.style.padding = '10px';
    deleteButton.style.margin = '2px';
    deleteButton.appendChild(deleteButtonText);
    newRow.appendChild(deleteButton);

    deleteButton.onclick = function () {
      deleteRow(basicTable, rowData.uniqueId);
    };

    const updateButton = document.createElement('button');
    const updateButtonText = document.createTextNode(' Update');
    updateButton.style.padding = '10px';
    updateButton.style.margin = '2px';
    updateButton.appendChild(updateButtonText);
    newRow.appendChild(updateButton);

    updateButton.onclick = function () {
      updateForm(rowData.uniqueId);
    };
  }
}
//------------FOR UNIQUE ID-GENERATOR----------------------------
function uniqueIdGenerator(length = 16) {
  return parseInt(
    Math.ceil(Math.random() * Date.now())
      .toPrecision(length)
      .toString()
      .replace('.', '')
  );
}
//------------DELETE FUNCTION----------------------------
function deleteRow(tbl, employeeId) {
  let forDeleteRow = getDataFromLocalStorage();
  const indexToDelete = forDeleteRow.findIndex((element) => element.uniqueId === employeeId);

  if (indexToDelete !== -1) {
    forDeleteRow = forDeleteRow.filter((element) => element.uniqueId !== employeeId);
    setDataInLocalStorage(forDeleteRow);

    const rows = tbl.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].cells[0].innerHTML == employeeId) {
        tbl.deleteRow(i);
        break;
      }
    }
  }
}
//----------------UPDATE FORM---------------------------------------
function updateForm(employeeId) {
  const forChangeForm = getDataFromLocalStorage();
  const empToUpdate = forChangeForm.find((element) => element.uniqueId === employeeId);
  if (empToUpdate) {
    editId = empToUpdate.uniqueId;
    document.forms[0].employeeName.value = empToUpdate.name;
    document.forms[0].employeeGender.value = empToUpdate.gender;
    document.forms[0].employeeBirthday.value = empToUpdate.birthDate;
    document.forms[0].employeeEmail.value = empToUpdate.email;
    document.forms[0].employeePhoneNo.value = empToUpdate.phoneNumber;
    document.forms[0].employeeHobby.forEach((checkbox) => {
      if (empToUpdate.hobby.includes(checkbox.value)) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
    });
  }
}

//------------UPDATE FUNCTION----------------------------
function updateRow(employeeUpdated, empToUpdateId) {
  const dataForUpdateRow = getDataFromLocalStorage();
  //------------EMAIL VALIDATION----------------------------
  console.log('empToUpdateId', empToUpdateId);
  const indexToUpdate = dataForUpdateRow.findIndex((element) => element.uniqueId === empToUpdateId);
  console.log('DataForUpdateRow', dataForUpdateRow);

  if (indexToUpdate !== -1) {
    const existingEmails = dataForUpdateRow.map((entry) => entry.email);
    const isDuplicate = existingEmails.some(
      (email, index) => email === employeeUpdated.email && index !== indexToUpdate
    );

    if (isDuplicate) {
      alert('This email is already registered.');
      return;
    }
    dataForUpdateRow[indexToUpdate] = { ...dataForUpdateRow[indexToUpdate], ...employeeUpdated };
    dataForUpdateRow[indexToUpdate].uniqueId = empToUpdateId;
    setDataInLocalStorage(dataForUpdateRow);
    console.log(dataForUpdateRow);

    const idOfTable = document.getElementById('basicTableId');
    const rows = idOfTable.getElementsByTagName('tr');
    console.log('indexToUpdate', indexToUpdate);
    const updateRowData = rows[indexToUpdate];
    if (updateRowData) {
      for (let i = 1; i < updateRowData.cells.length; i++) {
        const cellKey = Object.keys(dataForUpdateRow[indexToUpdate])[i];
        updateRowData.cells[i].innerHTML = dataForUpdateRow[indexToUpdate][cellKey];
      }
      editId = '';
      clearForm();
    }
  }
}
function clearForm() {
  document.forms[0].reset();
}
function styleOfTableHeader(stylingTableHeader) {
  stylingTableHeader.style.padding = '15px';
  stylingTableHeader.style.backgroundColor = '#4CAF50';
  stylingTableHeader.style.color = 'white';
}
//-----------------------------------------------------------------------------------------------------------------------

