import * as fs from 'fs';
import * as readline from 'readline';
import { fromBech32, toBech32 } from '@cosmjs/encoding';

function parseAddress(nomicAddress) {
	const nomicKeyData = fromBech32(nomicAddress).data;
	const evmosAddress = toBech32('evmos', nomicKeyData);
	return evmosAddress;
}

console.log("address,evmos_address,evmos_9000-1_staked,evmos_9000-1_count");

const rl = readline.createInterface({
  input: fs.createReadStream('airdrop2_snapshot.csv'),
  crlfDelay: Infinity,
});

let firstLineSkipped = false;
rl.on('line', (line) => {
  if (!firstLineSkipped) {
  	firstLineSkipped = true;
  	return;
  }
  
  let splitted = line.split(',')
  if (splitted[1] === '0') {
    return;
  }

  let address = splitted[0];
  let evmosAddress = parseAddress(address)
  console.log(`${address},${evmosAddress},${splitted[1]},${splitted[2]}`);
});
