// Array di oggetti che rappresentano i contatti e i loro messaggi
const contacts = [
    {
        name: 'Michele',
        avatar: 'https://i.pravatar.cc/150?img=1',
        visible: true,
        messages: [
            { date: '10/01/2020 15:30:55', message: 'Hai portato a spasso il cane?', status: 'sent' },
            { date: '10/01/2020 15:50:00', message: 'Ricordati di stendere i panni', status: 'sent' },
            { date: '10/01/2020 16:15:22', message: 'Tutto fatto!', status: 'received' }
        ],
    },
    {
        name: 'Fabio',
        avatar: 'https://i.pravatar.cc/150?img=2',
        visible: true,
        messages: [
            { date: '20/03/2020 16:30:00', message: 'Ciao come stai?', status: 'sent' },
            { date: '20/03/2020 16:30:55', message: 'Bene grazie! Stasera ci vediamo?', status: 'received' },
            { date: '20/03/2020 16:35:00', message: 'Mi piacerebbe ma devo andare a fare la spesa.', status: 'sent' }
        ],
    },
    {
        name: 'Samuele',
        avatar: 'https://i.pravatar.cc/150?img=3',
        visible: true,
        messages: [
            { date: '28/03/2020 10:10:40', message: 'La Marianna va in campagna', status: 'received' },
            { date: '28/03/2020 10:20:10', message: 'Sicuro di non aver sbagliato chat?', status: 'sent' },
            { date: '28/03/2020 16:15:22', message: 'Ah scusa!', status: 'received' }
        ],
    },
    {
        name: 'Alessandro B.',
        avatar: 'https://i.pravatar.cc/150?img=4',
        visible: true,
        messages: [
            { date: '10/01/2020 15:30:55', message: 'Lo sai che ha aperto una nuova pizzeria?', status: 'sent' },
            { date: '10/01/2020 15:50:00', message: 'Si, ma preferirei andare al cinema', status: 'received' }
        ],
    },
    {
        name: 'Alessandro L.',
        avatar: 'https://i.pravatar.cc/150?img=5',
        visible: true,
        messages: [
            { date: '10/01/2020 15:30:55', message: 'Ricordati di chiamare la nonna', status: 'sent' },
            { date: '10/01/2020 15:50:00', message: 'Va bene, stasera la sento', status: 'received' }
        ],
    },
    {
        name: 'Claudia',
        avatar: 'https://i.pravatar.cc/150?img=6',
        visible: true,
        messages: [
            { date: '10/01/2020 15:30:55', message: 'Ciao Claudia, hai novità?', status: 'sent' },
            { date: '10/01/2020 15:50:00', message: 'Non ancora', status: 'received' },
            { date: '10/01/2020 15:51:00', message: 'Nessuna nuova, buona nuova', status: 'sent' }
        ],
    },
    {
        name: 'Federico',
        avatar: 'https://i.pravatar.cc/150?img=7',
        visible: true,
        messages: [
            { date: '10/01/2020 15:30:55', message: 'Fai gli auguri a Martina che è il suo compleanno!', status: 'sent' },
            { date: '10/01/2020 15:50:00', message: 'Grazie per avermelo ricordato, le scrivo subito!', status: 'received' }
        ],
    },
    {
        name: 'Davide',
        avatar: 'https://i.pravatar.cc/150?img=8',
        visible: true,
        messages: [
            { date: '10/01/2020 15:30:55', message: 'Ciao, andiamo a mangiare la pizza stasera?', status: 'sent' },
            { date: '10/01/2020 15:50:00', message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!', status: 'sent' },
            { date: '10/01/2020 15:51:00', message: 'OK!!', status: 'received' }
        ],
    }
];

// Array di messaggi casuali per simulare risposte
const randomTextMessages = [
    '42.',
    'Ok!',
    'Anche secondo me.',
    'Però dipende.',
    'Non voglio ne confermare ne smentire quello che stai dicendo.',
    'Non lo so.',
    'Non disturbarmi.',
    'Chiedo e ti dico.',
    'Me ne assumo la totale responsabilità.'
];

// Classe CStatus per gestire lo stato dei contatti
class CStatus {
    constructor(status, index) {
        this.status = status;
        this.index = index;
    }
}

// Classe CStatusList per gestire una lista di stati
class CStatusList {
    constructor() {
        this.list = [];
    }

    // Rimuove uno stato dalla lista in base all'indice
    removeStatus(index) {
        this.list = this.list.filter(cStatus => cStatus.index !== index);
    }

    // Imposta lo stato di un contatto in base all'indice
    setStatus(index, status) {
        const cStatus = this.getStatus(index);
        if (cStatus) {
            cStatus.status = status;
        }
    }

    // Ottiene l'ultimo stato di un contatto in base all'indice
    getLastStatus(index) {
        const cStatus = [...this.list].reverse().find(cStatus => cStatus.index === index);
        return cStatus ? cStatus.status : "NOT-ONLINE";
    }

    // Ottiene lo stato di un contatto in base all'indice
    getStatus(index) {
        return this.list.find(cStatus => cStatus.index === index);
    }

    // Aggiunge uno stato "WRITING" per un contatto in base all'indice
    addStatus(index) {
        this.list.push(new CStatus("WRITING", index));
    }
}

// Funzione helper per ottenere un messaggio di testo casuale
function getRandomTextMessage() {
    const max = randomTextMessages.length;
    const index = Math.floor(Math.random() * max);
    return randomTextMessages[index];
}

// Funzione helper per ridurre la dimensione del messaggio se supera una lunghezza massima
function reduceMexSize(mex) {
    const MAX_LENGTH = 40;
    const message = mex.message;
    return message.length > MAX_LENGTH ? `${message.substring(0, MAX_LENGTH - 3)}...` : message;
}

// Creazione dell'applicazione Vue
const { createApp } = Vue;

createApp({
    data() {
        return {
            activeContact: -1, // Indice del contatto attivo
            contacts: contacts, // Array dei contatti
            newMessage: "", // Nuovo messaggio da inviare
            newContactName: "", // Nome del nuovo contatto
            newContactImg: "", // Immagine del nuovo contatto
            searcContact: "", // Testo di ricerca per i contatti
            statusList: new CStatusList(), // Lista degli stati dei contatti
            newContactError: "", // Errore nella creazione di un nuovo contatto
        };
    },
    methods: {
        // Ottiene l'ultimo messaggio di una lista di messaggi
        getLastMex(messages) {
            return messages.length ? reduceMexSize(messages[messages.length - 1]) : "";
        },

        // Ottiene la data di un messaggio
        getMexDate(message) {
            return message ? luxon.DateTime.fromFormat(message.date, "dd/MM/yyyy HH:mm:ss").toLocaleString(luxon.DateTime.TIME_SIMPLE) : 'tempo fa';
        },

        // Ottiene la data dell'ultimo messaggio di una lista di messaggi
        getLastMexDate(messages) {
            return messages.length ? this.getMexDate(messages[messages.length - 1]) : "";
        },

        // Imposta un contatto come attivo in base all'indice
        getActiveContact(index) {
            this.activeContact = index;
        },

        // Invia un nuovo messaggio
        sendMessage() {
            const mexTrimmed = this.newMessage.trim();
            if (mexTrimmed) {
                const dateNow = luxon.DateTime.now().toFormat("dd/MM/yyyy HH:mm:ss");
                const mexObj = { date: dateNow, message: mexTrimmed, status: 'sent' };
                this.contacts[this.activeContact].messages.push(mexObj);
                this.newMessage = "";
                this.waitForAnswer();
            }
        },

        // Simula l'attesa di una risposta
        waitForAnswer() {
            const tmpActvContact = this.activeContact;
            this.statusList.addStatus(tmpActvContact);
            this.updateStatus();
            this.waitReplies(tmpActvContact);
            this.waitLeavesChat(tmpActvContact);
        },

        // Simula una risposta dopo un tempo di attesa
        waitReplies(actvContact) {
            setTimeout(() => {
                this.reciveMessage(actvContact);
                this.statusList.setStatus(actvContact, 'ONLINE');
                this.updateStatus();
            }, 10 * 1000);
        },

        // Simula l'uscita dalla chat dopo un tempo di attesa
        waitLeavesChat(actvContact) {
            setTimeout(() => {
                this.statusList.removeStatus(actvContact);
                this.updateStatus();
            }, 15 * 1000);
        },

        // Aggiorna lo stato del contatto attivo
        updateStatus() {
            const activeStatus = this.statusList.getLastStatus(this.activeContact);
            if (activeStatus === 'WRITING') {
                return `Sta scrivendo...`;
            } else if (activeStatus === 'ONLINE') {
                return `Online`;
            } else {
                const activeChat = this.contacts[this.activeContact].messages;
                const lastMexReceived = [...activeChat].reverse().find(mex => mex.status === 'received');
                return `Ultimo messaggio inviato alle ${this.getMexDate(lastMexReceived)}`;
            }
        },

        // Simula la ricezione di un messaggio
        reciveMessage(activeContact) {
            const text = getRandomTextMessage();
            const dateNow = luxon.DateTime.now().toFormat("dd/MM/yyyy HH:mm:ss");
            const newMessageObj = { date: dateNow, message: text, status: 'received' };
            this.contacts[activeContact].messages.push(newMessageObj);
        },

        // Elimina un messaggio specifico
        deleteMessage(message) {
            const activeChat = this.contacts[this.activeContact].messages;
            const messageIndex = activeChat.indexOf(message);
            activeChat.splice(messageIndex, 1);
        },

        // Elimina tutti i messaggi di un contatto specifico
        deleteAllMessage(contact) {
            contact.messages = [];
        },

        // Elimina una chat specifica
        deleteChat(index) {
            this.contacts.splice(index, 1);
            this.activeContact = -1;
        },

        // Aggiunge un nuovo contatto
        addNewUser() {
            const img = new Image();
            img.src = this.newContactImg;

            img.onload = () => {
                const newContact = {
                    name: this.newContactName,
                    avatar: this.newContactImg,
                    visible: true,
                    messages: [],
                };
                this.contacts.push(newContact);
                this.resetNewContact();
                this.newContactError = "";
            };

            img.onerror = () => {
                this.newContactError = "Percorso dell'immagine non valido";
                this.resetNewContact();
            };
        },

        // Resetta i campi di input per l'aggiunta di un nuovo contatto
        resetNewContact() {
            this.newContactName = "";
            this.newContactImg = "";
        },

        // Scorre automaticamente la chat verso il basso
        scrollDownChat() {
            const el_chat = document.querySelector(".chat");
            el_chat.scrollTo(0, el_chat.scrollHeight);
        },
    },
    computed: {
        // Filtra la lista dei contatti in base alla ricerca
        filteredList() {
            const searchLower = this.searcContact.toLowerCase();
            return this.contacts.filter(contact => contact.name.toLowerCase().includes(searchLower));
        }
    },
    updated() {
    },
}).mount('#app');
