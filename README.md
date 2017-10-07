# Transcribe Dialect

## Entwicklungsumgebung Einrichten

Klonen Repository
```shell
$ git clone git@github.com:rafaelbeck/transcribe-dialect.git
$ cd transcribe-dialect
$ npm install
```

## Build erstellen

### Lokale Ziele

Erstellt und Kompiliert die Applikation mit der Konfiguration für den produktiven Server und legt das Resultat im dist/ Ordner ab.
```shell
$ npm run build
```

Startet den Node Web Server über den Port 8080.
```shell
$ npm run
```

## Release erstellen

Release einer neuen Version:
```shell
$ npm run release
```
* Update der Versionsnummer in der package.json Datei
* Commit der package.json Datei
* Erstellt einen Git Tag für die neue Version
* Push auf den remote Server
