// An diesem importierten Mongoose-Modul ist unsere Verbindung angehängt,
// die wir in der server.js aufgerufen (importiert) haben.
import mongoose from "mongoose";

// Mit Mongoose lassen sich Schemata erstellen,
// die die Datenstruktur unserer Dokumente beschreiben.
// Hier geben wir die Form vor, die durch Mongoose überwacht wird.
// Eigenschaften wie "type", "required", "default" und "unique" können für die Beschreibung der einzelnen Properties verwendet werden.
const schema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
    },
    business: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    majorCustomer: {
        type: Boolean,
    },
    totalSales: {
        type: Number,
    },
});

// Mit der folgenden Zeile registrieren wir das Model in Mongoose.
// Mongoose wird automatisch die passende Collection in unserer Datenbank erstellen.
// Dafür ist der Name wichtig: Als Model schreiben wir ihn in der Einzahl und mit großen Anfangsbuchstaben.
// Die Collection wird daraus abgeleitet und klein geschrieben als Mehrzahl benannt.
const Customer = mongoose.model("Customer", schema); // Collection => reports

// Wir können das Model an dieser Stelle bereits exportieren.
// Allerdings müssen wir dadurch wieder datenbankspezifische (oder "speziellere") Logik in den Controllern beachten.
// export default Report;

// Stattdessen können wir auch einzelne Methoden exportieren.
// So bleibt unser Model in sich geschlossen
// und bietet eine überschaubare Schnittstelle an.
// Wir werden in Zukunft noch einen anderen Weg kennenlernen,
// wie wir Methoden in Mongoose Models verwenden.
export const getAll = async () => {
    const customers = await Customer.find();
    return customers;
};

export const create = async ({
    firstname,
    lastname,
    business,
    email,
    majorCustomer,
    totalSales,
}) => {
    // Zum Erstellen eines neuen Datensatzes instanziieren wir ein neues Objekt des Models.
    // Im Constructor übergeben wir das zu erstellende Dokument.
    const newCustomer = new Customer({
        firstname,
        lastname,
        business,
        email,
        majorCustomer,
        totalSales,
    });

    // Erst wenn wir save() ausführen, wird der Datensatz in der Collection gespeichert.
    const result = await newCustomer.save();
    return result;
};
