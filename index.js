const {
    QRCodeStyling,
} = require('qr-code-styling-node/lib/qr-code-styling.common.js');
const nodeCanvas = require('canvas');
const { JSDOM } = require('jsdom');

const express = require('express');

const app = express();

const options = {
    width: 500,
    height: 500,
    image: 'https://code-planet.eu/rocket_1f680.png',
    data: 'https://code-planet.eu/game',
    dotsOptions: {
        color: '#b5b4f2',
        type: 'extra-rounded',
    },
    cornersSquareOptions: {
        type: 'extra-rounded',
        color: '#b5b4f2',
        gradient: null,
    },
    backgroundOptions: {
        color: 'transparent',
    },
    imageOptions: {
        crossOrigin: 'anonymous',
        imageSize: 0.4,
        margin: 20,
    },
    qrOptions: {
        typeNumber: '0',
        mode: 'Byte',
        errorCorrectionLevel: 'Q',
    },
};

app.get('/', (req, res) => {
    url = req.query.url;
    url ? (options.data = url) : (options.data = 'https://code-planet.eu/game');
    res.header('Content-Type', 'image/svg+xml');

    const qrCodeSvg = new QRCodeStyling({
        jsdom: JSDOM, // this is required
        type: 'svg',
        ...options,
    });

    qrCodeSvg.getRawData('svg').then((buffer) => {
        console.log(buffer);
        res.send(buffer);
    });
});

app.listen(1212);
