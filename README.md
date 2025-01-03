<h1 align="center">Split CIDR Band</h1>

<p align="center">
A Node.js tool for analyzing and classifying CIDR ranges from major tech companies using DNS lookup strategies
</p>

## Overview

Split CIDR Band is a utility tool that helps identify and classify IP ranges (CIDR blocks) from major tech companies (Facebook, Google, Amazon) into two categories:

- Bot networks (used for web crawlers/spiders)
- Cloud infrastructure ranges

## Features

- Parse and validate CIDR notation
- Perform forward and reverse DNS lookups
- Identify bot networks through hostname pattern matching
- Classify cloud infrastructure ranges
- Support for multiple platform patterns (Google, Microsoft, etc.)
- Efficient IP range splitting and analysis

## Technical Details

### Prerequisites

- Node.js 14.x or higher
- npm or pnpm package manager

### Dependencies

- [`ip-cidr`](https://www.npmjs.com/package/ip-cidr): ^2.1.0 - IP CIDR manipulation

## Installation

```bash
# Using npm
npm install

# Using pnpm
pnpm install
```

## Usage

```javascript
import { IPCIDR } from "ip-cidr";

// Example CIDR analysis
const cidr = new IPCIDR("192.168.0.0/24");
const ipRange = cidr.toArray();
```

## How It Works

1. Takes CIDR ranges as input
2. Performs DNS lookups (forward and reverse)
3. Matches patterns to identify bot networks
4. Classifies remaining ranges as cloud infrastructure
5. Outputs results with classification

## Author

@DinhThienPhuc

## License

MIT
