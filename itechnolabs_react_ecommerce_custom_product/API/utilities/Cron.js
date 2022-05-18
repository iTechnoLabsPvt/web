// import { SOAPClient } from './methods';
import ProductsCollection from '../collections/products';
import { Vendor, Products } from '../mysqlDb';
import Client from 'ssh2-sftp-client';
import cron from 'node-cron';
import fs from 'fs';
import CSVToJSON from 'csvtojson';
import _ from 'underscore';
import logger from './logger';
import axios from 'axios';
/*
const SanMarProductsList = [
  {
    key: 'BA6150',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Print']
  },
  {
    key: '411072',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'NF0A3KX7',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: '91005',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'BG210',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'CQ9470',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Print']
  },
  {
    key: '97000',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Print']
  },
  {
    key: '417028',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Print']
  },
  {
    key: 'LPST891',
    moq: 24,
    embelleshing_area: ['Front', 'Back'],
    embelleshing_type: ['Print']
  },
  {
    key: 'LPC78H',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print']
  },
  {
    key: 'DT1101',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print']
  },
  {
    key: 'DT571',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print']
  },
  {
    key: 'DT671',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print']
  },
  {
    key: 'LNEA122',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print']
  },
  {
    key: 'NEA122',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print']
  },
  {
    key: 'NF0A3LGT',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print']
  },
  {
    key: 'NF0A3LGU',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print']
  },
  {
    key: 'LK542',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print']
  },
  {
    key: 'K542',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print']
  },
  {
    key: '203697',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print']
  },
  {
    key: 'LOG101',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print']
  },
  {
    key: 'ST650',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print']
  },
  {
    key: 'LST650',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print']
  },
  {
    key: '604941',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print']
  },
  {
    key: 'OG122',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print']
  },
  {
    key: 'OE701',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print']
  },
  {
    key: 'LOE335',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print']
  },
  {
    key: 'J343',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print']
  },
  {
    key: 'NF0A3LHB',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Arm'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'NF0A3LHC',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Arm'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'DM108L',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print']
  },
  //add new product
  {
    key: '413009',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'NF0A52S6',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'BG213',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'BG202',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'BG218',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'BG222',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'NF0A3KX8',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'BG209',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: '91004',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'NEB201',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'BG7150',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'BG620',
    moq: 24,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: '92000',
    moq: 24,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'BA5953',
    moq: 24,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'BG80',
    moq: 24,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'B119',
    moq: 24,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: '412045',
    moq: 24,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'BG617C',
    moq: 24,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'BG614',
    moq: 24,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: '412046',
    moq: 24,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'NEB600',
    moq: 24,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'BG814',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'BA5966',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'BA5957',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'BA5797',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: '108087',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: '108084',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'BG1050',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'BG990S',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: '711003',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'NF0A3KXX',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'BG803',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'NEB800',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'NEB700',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'BA6142',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'B400',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'B110',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'B118',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'B1510',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'BG408',
    moq: 48,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'BG410',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'BG414',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'BG406',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'BG418',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'BG417',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: '94000',
    moq: 12,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Heat Transfer', 'Embroidery']
  },
  {
    key: 'B159',
    moq: 72,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'NF0A529K',
    moq: 12,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'NF0A529L',
    moq: 12,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'NF0A529A',
    moq: 12,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'NF0A529Q',
    moq: 12,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'J323',
    moq: 12,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'L850',
    moq: 12,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'CT103828',
    moq: 12,
    embelleshing_area: ['Front', 'Back', 'Arm'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'J763H',
    moq: 12,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'CT104050',
    moq: 12,
    embelleshing_area: ['Front', 'Back', 'Arm'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'CT104053',
    moq: 12,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'ST274',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'LST274',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'L905',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'F905',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'L131',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: 'F211',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'L211',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'K809',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'L239',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'LOG815',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: 'NF0A552Z',
    moq: 12,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'NF0A529R',
    moq: 12,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'NF0A5541',
    moq: 12,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'J339',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'NF0A5542',
    moq: 12,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'NF0A5543',
    moq: 12,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'CT102286',
    moq: 12,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'NF0A529P',
    moq: 12,
    embelleshing_area: ['Front', 'Back', 'Arm'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'NF0A529O',
    moq: 12,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'EB656',
    moq: 12,
    embelleshing_area: [],
    embelleshing_type: []
  },
  {
    key: 'EB657',
    moq: 12,
    embelleshing_area: [],
    embelleshing_type: []
  },
  {
    key: 'L331',
    moq: 12,
    embelleshing_area: [],
    embelleshing_type: []
  },
  {
    key: 'J333',
    moq: 12,
    embelleshing_area: [],
    embelleshing_type: []
  },
  {
    key: 'NF0A47FJ',
    moq: 12,
    embelleshing_area: ['Front', 'Back', 'Arm'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'CTJ162',
    moq: 12,
    embelleshing_area: [],
    embelleshing_type: []
  },
  {
    key: 'NF0A3LH4',
    moq: 12,
    embelleshing_area: [],
    embelleshing_type: []
  },
  {
    key: 'K585',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'LK587',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'K587',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'LNEA301',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'OG143',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: '244620',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'OG101',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Arm'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'K500LSP',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Arm'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'ST657',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: '604940',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'TST650',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'TLK500LS',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'K540LS',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Arm'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: '2007W',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'BC3501',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'NKBQ5232',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'NKBQ5230',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: '6014',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'CTK126',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'OE340',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: '4410',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'G2400',
    moq: 36,
    embelleshing_area: ['Front', 'Back', 'Arm'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: '29LS',
    moq: 36,
    embelleshing_area: ['Front', 'Back', 'Arm'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'AL6004',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'DT6021',
    moq: 36,
    embelleshing_area: [],
    embelleshing_type: []
  },
  {
    key: '9360',
    moq: 36,
    embelleshing_area: [],
    embelleshing_type: []
  },
  {
    key: 'BC3480',
    moq: 36,
    embelleshing_area: [],
    embelleshing_type: []
  },
  {
    key: 'LOE327',
    moq: 36,
    embelleshing_area: [],
    embelleshing_type: []
  },
  {
    key: 'BC8803',
    moq: 36,
    embelleshing_area: [],
    embelleshing_type: []
  },
  {
    key: 'BC8800',
    moq: 36,
    embelleshing_area: [],
    embelleshing_type: []
  },
  {
    key: 'BC6003',
    moq: 36,
    embelleshing_area: [],
    embelleshing_type: []
  },
  {
    key: 'BC6008',
    moq: 36,
    embelleshing_area: [],
    embelleshing_type: []
  },
  {
    key: 'BC6682',
    moq: 36,
    embelleshing_area: [],
    embelleshing_type: []
  },
  {
    key: 'H000',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: 'PC600',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Arm'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'AL2004',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Arm'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'TR401W',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: '88M',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Arm'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'PC145',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: '727982',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: 'BC3413',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: 'BC3001U',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: 'BC3001',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: '6030',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: '1717',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: 'BC3001CVC',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: '2001A',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: 'CTTK87',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: 'CT100410',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: 'NEA533',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Arm'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'LNEA533',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Arm'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'CN9473',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: 'DT8102',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Arm'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'S101SS',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: 'RW01W',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: 'GDS101',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: '12500',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: 'F170',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Arm'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: '18600',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Arm'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'BC3739',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Arm'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'BC3729',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: 'DT356',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: 'CTK121',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Arm'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'LOG810',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Arm'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'BC7502',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: 'NF0A47FF',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Arm'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'DT1105',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: 'CTK124',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Arm'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'DT8104',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Arm'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'DT6104',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: 'GDS149',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: 'F260',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: 'BC3901',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: '1566',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: 'ST273',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Arm'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'OG813',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: 'LST711',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: 'K805',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: '746102',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: 'NF0A47FB',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: 'OG813',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: '779796',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: 'NF0A47FC',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Arm'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: '779803',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: 'OG813',
    moq: 24,
    embelleshing_area: ['Front', 'Back', 'Side'],
    embelleshing_type: []
  },
  {
    key: 'CT104597',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: 'NF0A4VUB',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: 'NE900',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: 'C908',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: []
  },
  {
    key: 'CP91L',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: 'CP90',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: []
  },
  {
    key: 'NE905',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: 'STC41',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: 'C935',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: 'NE904',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: 'NE902',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: 'NF0A4VUA',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: 'CT103056',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: 'NE403',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: 'STC38',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: 'STC39',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: 'C940',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: 'PWU',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: 'CP81',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: []
  },
  {
    key: 'CP83',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: 'CP84',
    moq: 36,
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  }
];

const ssactiverwearProductList = [
  {
    key: 'W2170',
    category: 'Apparel',
    subcategory: 'Fitness',
    moq: 24,
    gender: 'Women',
    embelleshing_area: ['Front', 'Back'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: '1207',
    category: 'Apparel',
    subcategory: 'Fitness',
    moq: 24,
    gender: 'Men',
    embelleshing_area: ['Front', 'Back'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: '4146',
    category: 'Apparel',
    subcategory: 'Fitness',
    moq: 24,
    gender: 'Women',
    embelleshing_area: ['Front', 'Back'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: '4623',
    category: 'Apparel',
    subcategory: 'Fitness',
    moq: 24,
    gender: 'Women',
    embelleshing_area: ['Front', 'Back'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: '4629',
    category: 'Apparel',
    subcategory: 'Fitness',
    moq: 24,
    gender: 'Women',
    embelleshing_area: ['Front', 'Back'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: '812',
    category: 'Apparel',
    subcategory: 'Fitness',
    moq: 24,
    gender: 'Women',
    embelleshing_area: ['Front', 'Back'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'K11',
    category: 'Apparel',
    subcategory: 'Fitness',
    moq: 24,
    gender: 'Women',
    embelleshing_area: ['Front', 'Back'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'R70',
    category: 'Apparel',
    subcategory: 'Fitness',
    moq: 24,
    gender: 'Men',
    embelleshing_area: ['Front', 'Back'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: '42700',
    category: 'Apparel',
    subcategory: 'Fitness',
    moq: 24,
    gender: 'Men',
    embelleshing_area: ['Front', 'Back', 'Left', 'Right'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: '46200',
    category: 'Apparel',
    subcategory: 'Fitness',
    moq: 24,
    gender: 'Men',
    embelleshing_area: ['Front', 'Back'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: '42MT',
    category: 'Apparel',
    subcategory: 'Fitness',
    moq: 24,
    gender: 'Men',
    embelleshing_area: ['Front', 'Back'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: '6733',
    category: 'Apparel',
    subcategory: 'Fitness',
    moq: 24,
    gender: 'Women',
    embelleshing_area: ['Front', 'Back'],
    embelleshing_type: ['Print', 'Embroidery']
  },

  {
    key: '146',
    category: 'Apparel',
    subcategory: 'Hats',
    moq: 24,
    gender: '',
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: '110C',
    category: 'Apparel',
    subcategory: 'Hats',
    moq: 24,
    gender: '',
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: '256',
    category: 'Apparel',
    subcategory: 'Hats',
    moq: 24,
    gender: '',
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: '511',
    category: 'Apparel',
    subcategory: 'Hats',
    moq: 24,
    gender: '',
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: 'VC300A',
    category: 'Apparel',
    subcategory: 'Hats',
    moq: 24,
    gender: '',
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: '6006',
    category: 'Apparel',
    subcategory: 'Hats',
    moq: 24,
    gender: '',
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: '6245CM',
    category: 'Apparel',
    subcategory: 'Hats',
    moq: 24,
    gender: '',
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: '6606',
    category: 'Apparel',
    subcategory: 'Hats',
    moq: 24,
    gender: '',
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  },

  {
    key: '9573',
    category: 'Apparel',
    subcategory: 'Outerwear',
    moq: 24,
    gender: 'Women',
    embelleshing_area: ['Front', 'Back', 'Left', 'Right'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: '3719',
    category: 'Apparel',
    subcategory: 'Outerwear',
    moq: 24,
    gender: 'Unisex',
    embelleshing_area: ['Front', 'Back', 'Left', 'Right'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: 'IND4000',
    category: 'Apparel',
    subcategory: 'Outerwear',
    moq: 24,
    gender: 'Men',
    embelleshing_area: ['Front', 'Back', 'Left', 'Right'],
    embelleshing_type: ['Print', 'Embroidery']
  },

  {
    key: '1941',
    category: 'Health/PPE',
    subcategory: '',
    moq: 24,
    gender: 'Men',
    embelleshing_area: ['Front'],
    embelleshing_type: ['Print']
  },
  {
    key: '1930',
    category: 'Health/PPE',
    subcategory: '',
    moq: 24,
    gender: 'Men',
    embelleshing_area: ['Front'],
    embelleshing_type: ['Print']
  },
  {
    key: 'FS20',
    category: 'Health/PPE',
    subcategory: '',
    moq: 24,
    gender: 'Men',
    embelleshing_area: ['Front'],
    embelleshing_type: ['Print']
  },
  {
    key: '1935',
    category: 'Health/PPE',
    subcategory: '',
    moq: 24,
    gender: 'Men',
    embelleshing_area: ['Front'],
    embelleshing_type: ['Print']
  },

  {
    key: 'W3006',
    category: 'Apparel',
    subcategory: 'Quarter Zips',
    moq: 24,
    gender: 'Women',
    embelleshing_area: ['Front', 'Back', 'Left', 'Right'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: '8433',
    category: 'Apparel',
    subcategory: 'Quarter Zips',
    moq: 24,
    gender: 'Women',
    embelleshing_area: ['Front', 'Back', 'Left', 'Right'],
    embelleshing_type: ['Print', 'Embroidery']
  },

  {
    key: '1301',
    category: 'Apparel',
    subcategory: 'T-Shirts',
    moq: 24,
    gender: 'Men',
    embelleshing_area: ['Front', 'Back', 'Left', 'Right'],
    embelleshing_type: ['Print', 'Embroidery']
  },

  {
    key: '3001',
    category: 'Apparel',
    subcategory: 'T-Shirts',
    moq: 24,
    gender: 'Unisex',
    embelleshing_area: ['Front', 'Back', 'Left', 'Right'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: '3413',
    category: 'Apparel',
    subcategory: 'T-Shirts',
    moq: 24,
    gender: 'Unisex',
    embelleshing_area: ['Front', 'Back', 'Left', 'Right'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: '3501',
    category: 'Apparel',
    subcategory: 'T-Shirts',
    moq: 24,
    gender: 'Unisex',
    embelleshing_area: ['Front', 'Back', 'Left', 'Right'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: '6210',
    category: 'Apparel',
    subcategory: 'T-Shirts',
    moq: 24,
    gender: 'Unisex',
    embelleshing_area: ['Front', 'Back', 'Left', 'Right'],
    embelleshing_type: ['Print', 'Embroidery']
  },
  {
    key: '6410',
    category: 'Apparel',
    subcategory: 'T-Shirts',
    moq: 24,
    gender: 'Unisex',
    embelleshing_area: ['Front', 'Back', 'Left', 'Right'],
    embelleshing_type: ['Print', 'Embroidery']
  },

  {
    key: 'SP12',
    category: 'Apparel',
    subcategory: 'Hats',
    moq: 24,
    gender: '',
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: 'SP08',
    category: 'Apparel',
    subcategory: 'Hats',
    moq: 24,
    gender: '',
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: 'SP15',
    category: 'Apparel',
    subcategory: 'Hats',
    moq: 24,
    gender: '',
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  },
  {
    key: 'SP12T',
    category: 'Apparel',
    subcategory: 'Hats',
    moq: 24,
    gender: '',
    embelleshing_area: ['Front'],
    embelleshing_type: ['Embroidery']
  }
];

const test = [
  {
    key: 'W2170',
    category: 'Apparel',
    subcategory: 'Fitness',
    moq: 24,
    gender: 'Women',
    embelleshing_area: ['Front', 'Back'],
    embelleshing_type: ['Print', 'Embroidery']
  }
];

const configData = JSON.stringify({
  CustomerNumber: '90580',
  APIKey: '469d3ca8-1820-4e3b-b3f1-e085c8c70287'
});
const configHeader = {
  Authorization: 'Basic OTA4NTA6NDY5ZDNjYTgtMTgyMC00ZTNiLWIzZjEtZTA4NWM4YzcwMjg3',
  'Content-Type': 'application/json'
};

//Function to get products daily after 24 hours
export const getProductsFromSANMARAPI = cron.schedule('* 23 * * *', async () => {
  //will run every 24 hours to get latest products and save in DB'
  console.log('getting latest products from SANMAR every 24 hours');
  await getFileFromFIleZiilaClient();
  await getProductStyleNameSSActivewear();
});

export const getFileFromFIleZiilaClient = async () => {
  console.log('called getFileFromFIleZiilaClient ');
  try {
    let client = new Client();
    let remotePath = '/SanMarPDD/SanMar_EPDD.csv';
    let dst = fs.createWriteStream('SANMAR.csv');

    client
      .connect({
        host: 'ftp.sanmar.com',
        user: '56404',
        password: 'Sanmar04',
        port: 2200
      })
      .then(() => {
        return client.get(remotePath, dst);
      })
      .then(async () => {
        await convertFileToJSON('SANMAR');
        client.end();
        logger.info('Successfully Write the csv file');
      })
      .catch(err => {
        console.error(err.message);
      });
  } catch (err) {
    console.log(err, 'error in getting products from CSV');
  }
};

export const convertFileToJSON = async type => {
  // convert csv file to JSON array
  CSVToJSON()
    .fromFile('SANMAR.csv')
    .then(async products => {
      let filteredProducts = _.filter(products, ele => {
        if (
          ele.FRONT_MODEL_IMAGE_URL &&
          ele.BACK_MODEL_IMAGE &&
          ele.PRODUCT_STATUS != 'Discontinued' &&
          ele.PRODUCT_STATUS != 'Closeout'
        ) {
          return _.findWhere(SanMarProductsList, { key: ele['STYLE#'] });
        }
      });
      await saveSanMarProductsInDB(filteredProducts, type);
      logger.info('Successfully convert csv file to json');
    })
    .catch(err => {
      // log error if any
      logger.error(err, 'Error in converting csv file to json');
    });
};

export const saveSanMarProductsInDB = async (products_to_save, type) => {
  try {
    let vendor = '';
    if (type == 'SANMAR') {
      vendor = await Vendor.findOne({ where: { vendor_name: 'SANMAR' } });
    }
    if (products_to_save.length) {
      products_to_save = await Promise.all(
        products_to_save.map(async obj => {
          obj.vendor_id = vendor ? vendor.dataValues.id : '';
          const prod = _.findWhere(SanMarProductsList, { key: obj['STYLE#'] });
          if (prod) {
            obj = { ...obj, ...prod };
          }
          return obj;
        })
      );
      products_to_save = _.uniq(products_to_save, 'UNIQUE_KEY');
      //save products in mysql
      await saveProductsInMySQL(products_to_save, vendor);
      //save products in mongo
      await saveProductsInMongo(products_to_save, vendor);
    }
    logger.info('Successfully save/update products in database');
    return;
  } catch (err) {
    logger.error(err.message, 'Error in saving/updating SanMar products in Db');
  }
};

const saveProductsInMySQL = async (products_to_save, vendor) => {
  products_to_save = await Promise.all(
    products_to_save.map(async obj => {
      let res = {};
      res.unique_key = obj.UNIQUE_KEY;
      res.product_title = obj.PRODUCT_TITLE;
      res.product_description = obj.PRODUCT_DESCRIPTION;
      res.style = obj['STYLE#'];
      res.available_sizes = obj.AVAILABLE_SIZES;
      res.brand_logo_image = obj.BRAND_LOGO_IMAGE;
      res.thumbnail_image = obj.THUMBNAIL_IMAGE;
      res.color_swatch_image = obj.COLOR_SWATCH_IMAGE;
      res.product_image = obj.PRODUCT_IMAGE;
      res.price_text = obj.PRICE_TEXT;
      res.suggested_price = obj.SUGGESTED_PRICE;
      res.category_name = obj.CATEGORY_NAME;
      res.subcategory_name = obj.SUBCATEGORY_NAME;
      res.color_name = obj.COLOR_NAME;
      res.color_square_image = obj.COLOR_SQUARE_IMAGE;
      res.color_product_image = obj.COLOR_PRODUCT_IMAGE;
      res.color_product_thumbnail_image = obj.COLOR_PRODUCT_IMAGE_THUMBNAIL;
      res.size = obj.SIZE;
      res.qty = obj.QTY;
      res.piece_weight = obj.PIECE_WEIGHT;
      res.piece_price = obj.PIECE_PRICE;
      res.dozens_price = obj.DOZENS_PRICE;
      res.case_price = obj.CASE_PRICE;
      res.price_group = obj.PRICE_GROUP;
      res.case_size = obj.CASE_SIZE;
      res.inventory_key = obj.INVENTORY_KEY;
      res.size_index = obj.SIZE_INDEX;
      res.mainframe_color = obj.SANMAR_MAINFRAME_COLOR;
      res.mill = obj.MILL;
      res.product_status = obj.PRODUCT_STATUS;
      res.companion_styles = obj.COMPANION_STYLES;
      res.MSRP = obj.MSRP;
      res.map_pricing = obj.MAP_PRICING;
      res.front_model_image_url = obj.FRONT_MODEL_IMAGE_URL;
      res.back_model_image = obj.BACK_MODEL_IMAGE;
      res.front_flat_image = obj.FRONT_FLAT_IMAGE;
      res.back_flat_image = obj.BACK_FLAT_IMAGE;
      res.GTIN = obj.GTIN;
      res.vendor_id = obj.vendor_id;
      res.moq = obj.moq;
      res.embelleshing_area = obj.embelleshing_area;
      res.embelleshing_type = obj.embelleshing_type;
      return res;
    })
  );
  let products = await Products.findAll({
    where: { vendor_id: vendor ? vendor.dataValues.id : '' }
  });
  if (products.length == 0) {
    await Products.bulkCreate(products_to_save);
    // fs.unlinkSync('SANMAR.csv');
  } else {
    await Promise.all(
      products_to_save.map(async obj => {
        await Products.update(obj, {
          where: { vendor_id: obj.vendor_id, unique_key: obj.unique_key }
        });
      })
    );
    // fs.unlinkSync('SANMAR.csv');
  }
  return;
};

const saveProductsInMongo = async (products_to_save, vendor) => {
  let products = await ProductsCollection.find({ vendor_id: vendor ? vendor.dataValues.id : '' });
  if (products.length == 0) {
    await ProductsCollection.register(products_to_save);
    // fs.unlinkSync('SANMAR.csv');
  } else {
    await Promise.all(
      products_to_save.map(async obj => {
        await ProductsCollection.findOneAndUpdate(
          { vendor_id: obj.vendor_id, UNIQUE_KEY: obj.UNIQUE_KEY },
          obj
        );
      })
    );
    // fs.unlinkSync('SANMAR.csv');
  }
  return;
};

//S&S activerwear product process
export const getProductStyleNameSSActivewear = async () => {
  console.log(`S&S_Activewear : getProductStyleName called. `);
  const styleNameList = await _.pluck(ssactiverwearProductList, 'key').join();
  const config = {
    method: 'get',
    url: `https://api.ssactivewear.com/v2/styles/?search=${styleNameList}`,
    headers: configHeader,
    data: configData
  };
  axios(config)
    .then(async response => {
      await getCompleteProductDetails(response.data);
      logger.info('Successfully get data according to styleName');
    })
    .catch(error => {
      console.log(error);
      logger.error(
        err.message,
        '[ getProductStyleName ] Error : while getting data from style api '
      );
    });
};

export const getCompleteProductDetails = async reqData => {
  try {
    const styleIdArray = await _.pluck(reqData, 'styleID');
    const styleIdList = styleIdArray.join();
    const config = {
      method: 'get',
      url: `https://api.ssactivewear.com/v2/products/?style=${styleIdList}`,
      headers: configHeader,
      data: configData
    };
    axios(config)
      .then(async response => {
        // console.log(JSON.stringify(response.data));
        let finalData = [];
        await Promise.all(
          response.data.filter(obj => {
            if (obj.colorFrontImage && obj.colorBackImage) {
              const styleData = _.findWhere(reqData, { styleID: obj['styleID'] });
              if (styleData) {
                obj = { ...obj, ...styleData };
                finalData.push(obj);
                return obj;
              }
            }
          })
        );
        await saveProductToSSActivewear(finalData, 'SS Activewear');
        // console.log('\n\n\n', finalData, '\n\n');
        logger.info('Successfully get data from product list');
      })
      .catch(error => {
        console.log(error);
        logger.error(
          err.message,
          '[ getCompleteProductDetails ] Error : while getting data from product api '
        );
      });
  } catch (err) {
    logger.error(err.message, 'Error in saving/updating SanMar products in Db');
  }
};

const saveProductToSSActivewear = async (data, type) => {
  let vendor = '';
  if (type == 'SS Activewear') {
    vendor = await Vendor.findOne({ where: { vendor_name: 'SS Activewear' } });
  }
  if (data.length) {
    data = await Promise.all(
      data.map(async obj => {
        obj.vendor_id = vendor ? vendor.dataValues.id : '';
        const prod = _.findWhere(ssactiverwearProductList, { key: obj['styleName'] });
        if (prod) {
          obj = { ...obj, ...prod };
        }
        return obj;
      })
    );
    data = _.uniq(data, 'skuID_Master');
    //save products in mysql
    await saveDataSSActivewearMysql(data, vendor);
    //save products in mongo
    await saveDataSSActivewearMongo(data, vendor);
  }
  logger.info('Successfully save/update products in database');
  return;
};

const saveDataSSActivewearMysql = async (products_to_save, vendor) => {
  products_to_save = await Promise.all(
    products_to_save.map(async obj => {
      if (obj) {
        let res = {};
        res.unique_key = obj.skuID_Master;
        res.product_title = obj.title;
        res.product_description = obj.description;
        res.style = obj.styleName;
        // res.available_sizes = obj.AVAILABLE_SIZES;
        res.brand_logo_image = obj.brandImage;
        // res.thumbnail_image = obj.THUMBNAIL_IMAGE;
        res.color_swatch_image = `https://www.ssactivewear.com/${obj.colorSwatchImage}`;
        res.product_image = `https://www.ssactivewear.com/${obj.styleImage}`;
        res.price_text = obj.piecePrice;
        res.suggested_price = obj.salePrice;
        res.category_name = obj.category;
        res.subcategory_name = obj.subcategory;
        res.color_name = obj.colorName;
        res.color_square_image = `https://www.ssactivewear.com/${obj.colorSwatchImage}`;
        res.color_product_image = `https://www.ssactivewear.com/${obj.colorFrontImage}`;
        // res.color_product_thumbnail_image = obj.COLOR_PRODUCT_IMAGE_THUMBNAIL;
        res.size = obj.sizeName;
        res.qty = obj.qty;
        res.piece_weight = obj.unitWeight;
        res.piece_price = obj.piecePrice;
        res.dozens_price = obj.dozenPrice;
        res.case_price = obj.casePrice;
        // res.price_group = obj.PRICE_GROUP;
        // res.case_size = obj.CASE_SIZE;
        // res.inventory_key = obj.INVENTORY_KEY;
        // res.size_index = obj.SIZE_INDEX;
        // res.mainframe_color = obj.SANMAR_MAINFRAME_COLOR;
        // res.mill = obj.MILL;
        // res.product_status = obj.PRODUCT_STATUS;
        res.companion_styles = obj.comparableGroup;
        // res.MSRP = obj.MSRP;
        res.map_pricing = obj.mapPrice;
        res.front_model_image_url = `https://www.ssactivewear.com/${obj.colorFrontImage}`;
        res.back_model_image = `https://www.ssactivewear.com/${obj.colorBackImage}`;
        // res.front_flat_image = obj.FRONT_FLAT_IMAGE;
        // res.back_flat_image = obj.BACK_FLAT_IMAGE;
        res.GTIN = obj.GTIN;
        res.vendor_id = obj.vendor_id;
        res.moq = obj.moq;
        res.embelleshing_area = obj.embelleshing_area;
        res.embelleshing_type = obj.embelleshing_type;
        return res;
      }
    })
  );
  let products = await Products.findAll({
    where: { vendor_id: vendor ? vendor.dataValues.id : '' }
  });
  if (products.length == 0) {
    await Products.bulkCreate(products_to_save);
    // fs.unlinkSync('SANMAR.csv');
  } else {
    await Promise.all(
      products_to_save.map(async obj => {
        await Products.update(obj, {
          where: { vendor_id: obj.vendor_id, unique_key: obj.unique_key }
        });
      })
    );
    // fs.unlinkSync('SANMAR.csv');
  }
  return;
};

const saveDataSSActivewearMongo = async (products_to_save, vendor) => {
  let products = await ProductsCollection.find({ vendor_id: vendor ? vendor.dataValues.id : '' });
  if (products.length == 0) {
    await ProductsCollection.register(products_to_save);
    // fs.unlinkSync('SANMAR.csv');
  } else {
    await Promise.all(
      products_to_save.map(async obj => {
        await ProductsCollection.findOneAndUpdate(
          { vendor_id: obj.vendor_id, UNIQUE_KEY: obj.UNIQUE_KEY },
          obj
        );
      })
    );
  }
  return;
};
// getProductStyleNameSSActivewear();
*/
