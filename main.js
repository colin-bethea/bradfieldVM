/* PSEUDO-CODE for VM
 * 
 * Initialize main memory in an array with length = 20 (amount of bytes total)
 *
 * Initialize instructions as separate variables and assign them to their hexadecimal number formats (ie: 0x01, 0x02, etc.)
 *
 * Initialize registers in an array as well, with a single program counter, and two general purpose registers; program counter should be equal to 0 by default
 *
 * Create a function that takes arguments from input for each general purpose register and applies them to a specified instruction
 *
 * Include a switch statement with cases for each instruction in the set; this is what you saw in LC3-VM in C, so it's likely the same in JS for this VM
 *
*/

/* PSEUDO-CODE for VOS
 *
 * Write a function that loads a program, translates virtual memory into physical mainMemory[] array locations
 *
 * Edit run function to support concurrent running of programs (with context switching?)
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


const mainMemory = [
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

// Assign a register array element to be the program counter (PC)


const instructionSet = (instructionType, reg1, reg2) => {
  switch (instructionType) {
    case loadWord:
      registers[parseInt(reg1, 10)] = mainMemory[parseInt(reg2, 10)] + (mainMemory[parseInt(reg2, 10) + 1] << 8); 
      break;
    case storeWord:
      mainMemory[parseInt(reg2, 10)] = registers[parseInt(reg1, 10)] & 0x00f; // Copy data from register to memory
      mainMemory[parseInt(reg2, 10) + 1] = registers[parseInt(reg1, 10)] >> 8;
      break;
    case add:
      registers[parseInt(reg1, 10)] += registers[parseInt(reg2, 10)]; // Make reg1 += reg2
      break;
    case halt:
      break;
    default:
  }
};

// Figure out how to run programs concurrently with split memory allocation + context switching

while (mainMemory[registers[0]] !== halt) {
  const programCounter = registers[0];
  instructionSet(mainMemory[parseInt(programCounter, 10)], mainMemory[parseInt(programCounter, 10) + 1], mainMemory[parseInt(programCounter, 10) + 2]);
  registers[0] += 3; // 
};

console.log(mainMemory);