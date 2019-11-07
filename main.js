/* PSEUDO-CODE
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


const instructionSet = function (instructionType, reg1, reg2) {
  switch (instructionType) {
    case loadWord:
      registers[parseInt(reg1)] = mainMemory[reg2] + (mainMemory[reg2 + 1] << 8); 
      break;
    case storeWord:
      mainMemory[parseInt(reg2)] = registers[reg1] & 0x00f; // Copy data from register to memory
      mainMemory[parseInt(reg2) + 1] = registers[reg1] >> 8;
      break;
    case add:
      registers[parseInt(reg1)] += registers[reg2]; // Make reg1 += reg2
      break;
    case halt:
      break;
    default:
  }
};


while (mainMemory[registers[0]] !== halt) {
  const programCounter = registers[0];
  instructionSet(mainMemory[programCounter], mainMemory[programCounter + 1], mainMemory[programCounter + 2]);
  registers[0] += 3; // 
}

console.log(mainMemory); // Wrap output into Node/Express + vanilla frontend instead of just console logging - go the full mile on this one


// Additional code for subtraction instruction (may not work for lack of negative number support)
    // case subtract:
    //  registers[reg1] -= registers[reg2]; // Make reg1 -= reg2
    //  break;

