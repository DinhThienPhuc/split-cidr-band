const IPCIDR = require("ip-cidr");
const { execSync } = require("child_process");

const PATTERN = {
  Google: /google(bot){0,1}\.com/,
  Microsoft: /search\.msn\.com/,
};

const lookup = (cidr, ip, platform) => {
  try {
    const dnsStdout = execSync(`host ${ip}`, { encoding: "utf8" });
    if (dnsStdout && PATTERN[platform].test(dnsStdout)) {
      console.log(`[${platform}] - [${cidr}]: ${ip}`);
    }
  } catch (err) {}
};

const platform = "Microsoft";
const cidrList = [];

let all = [],
  arr = [],
  cidr = "";

cidrList.map((cidrStr) => {
  cidr = new IPCIDR(cidrStr);

  if (!cidr.isValid()) {
    throw new Error("CIDR is invalid");
  }

  all = cidr.toArray();
  arr = cidr.toRange();
  arr.push(all[5]);
  arr.push(all[10]);
  arr.push(all[15]);

  arr.map((ip) => {
    lookup(cidrStr, ip, platform);
  });
});
