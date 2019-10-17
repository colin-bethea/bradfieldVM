
// Enumerate registers for VM; three total => two general purpose (R0 + R1) and one as a program counter (RPC)

enum {
  R0 = 0,
  R1,
  RPC
};

// Enumerate instruction set for VM; five total => load word, store word, add, subtract, and halt


// Initialize array for memory in VM; should be 20 bytes simulated, (naturally) with a length of 20


