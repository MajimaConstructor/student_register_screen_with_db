
const firebaseConfig = {
    apiKey: "AIzaSyDp0F09crd8IKG70636bbFo0xUMZhJrqvo",
    authDomain: "prototype-oop2-db.firebaseapp.com",
    databaseURL: "https://prototype-oop2-db-default-rtdb.firebaseio.com",
    projectId: "prototype-oop2-db",
    storageBucket: "prototype-oop2-db.appspot.com",
    messagingSenderId: "125729382649",
    appId: "1:125729382649:web:fcd7ea140bf34aa81f4228",
    measurementId: "G-G0359LTJ7P"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

// Form for creating a record
document.querySelector('#createForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.querySelector('#nome').value;
  const idade = parseInt(document.querySelector('#idade').value);
  const email = document.querySelector('#email').value;

  const newRecord = {
    nome: nome,
    Idade: idade,
    email: email
  };

  database.ref('students').push(newRecord)
    .then(() => {
      console.log('Record created successfully');
    })
    .catch(error => {
      console.error('Error creating record:', error);
    });
});

// Form for updating a record
document.querySelector('#updateForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const updateId = document.querySelector('#updateId').value;
  const newNome = document.querySelector('#newNome').value;
  const newIdade = parseInt(document.querySelector('#newIdade').value);
  const newEmail = document.querySelector('#newEmail').value;

  const updatedData = {
    nome: newNome,
    Idade: newIdade,
    email: newEmail
  };

  database.ref('students/' + updateId).update(updatedData)
    .then(() => {
      console.log('Record updated successfully');
    })
    .catch(error => {
      console.error('Error updating record:', error);
    });
});

// Form for reading a record
document.querySelector('#readForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const readId = document.querySelector('#readId').value;
  const readResult = document.querySelector('#result');

  database.ref('students/' + readId).once('value')
    .then(snapshot => {
      const data = snapshot.val();
      if (data) {
        readResult.innerHTML = JSON.stringify(data, null, 2);
      } else {
        readResult.innerHTML = 'Record not found';
      }
    })
    .catch(error => {
      console.error('Error reading record:', error);
      readResult.innerHTML = 'Error: Unable to read record';
    });
});

// Form for deleting a record
document.querySelector('#deleteForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const deleteId = document.querySelector('#deleteId').value;

  database.ref('students/' + deleteId).remove()
    .then(() => {
      console.log('Record deleted successfully');
    })
    .catch(error => {
      console.error('Error deleting record:', error);
    });
});
