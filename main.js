/* PSEUDO-CODE for VOS
 * 
 * Initialize a hash table for paging (or maybe an array with sub-arrays)
 *
 * Write a function that loads, reads, and parses VEF files into segment headers in hex format (little-endian)
 *
 * Take segment headers and put them into hashed paging table as hex numbers (or individual sub-arrays symbolic of pages)
 *
 * Execute programs from virtual memory (linked to disk/physicalMemory)
 *
 * Switch between segment headers (2 per program) intermittently => confused on this one
 *
 *  
 *
*/ 

// Initialize main memory (RAM) for VM in hexadecimal format with 20 bytes

const loadWord = 0x01; // Load data from memory into register
const storeWord = 0x02; // Copy data from memory into register
const add = 0x03; // Add two arguments together with two registers
const halt = 0x04; // Stop the instruction set

// Initialize registers in an array

const registers = [0, null, null]; // registers[0] is the program counter, set to 0;

// Initialize main memory (RAM) => 

const physicalMemory = [
 //
 0x01,
 0x01,
 0x10,
 //
 0x01,
 0x02,
 0x12,
 //
 0x02,
 0x01,
 0x02,
 //
 0x03,
 0x01,
 0x0e,
 //
 0x04,
 null,
 0x00,
 0x00,
 0xff,
 0x00,
 0xff,
 0x00
];

const virtualMemory = [];

for (let i = 0; i < physicalMemory.length; i++) {
  virtualMemory[i] = physicalMemory[i];
  console.log(virtualMemory);
};

// Assign a register array element to be the program counter (PC)

const instructionSet = (instructionType, reg1, reg2) => {
  switch (instructionType) {
    case loadWord:
      registers[parseInt(reg1, 10)] = physicalMemory[parseInt(reg2, 10)] + (physicalMemory[parseInt(reg2, 10) + 1] << 8); 
      break;
    case storeWord:
      physicalMemory[parseInt(reg2, 10)] = registers[parseInt(reg1, 10)] & 0x00f; // Copy data from register to memory
      physicalMemory[parseInt(reg2, 10) + 1] = registers[parseInt(reg1, 10)] >> 8;
      break;
    case add:
      registers[parseInt(reg1, 10)] += registers[parseInt(reg2, 10)]; // Make reg1 += reg2
      break;
    case halt:
      break;
    default:
  }
};

// Run while loop to handle computer running

while (physicalMemory[registers[0]] !== halt) {
  const programCounter = registers[0];
  instructionSet(physicalMemory[parseInt(programCounter, 10)], physicalMemory[parseInt(programCounter, 10) + 1], physicalMemory[parseInt(programCounter, 10) + 2]);
  registers[0] += 3; // 
};

console.log(physicalMemory);
