const fs = require("fs");
const IPCIDR = require("ip-cidr");
const { execSync } = require("child_process");

const PATTERN = {
  Google: /google(bot){0,1}\.com/,
  Microsoft: /search\.msn\.com/,
};

const lookup = (ip, platform) => {
  try {
    const dnsStdout = execSync(`host ${ip}`, { encoding: "utf8" });
    if (!dnsStdout) {
      return false;
    }
    if (!PATTERN[platform].test(dnsStdout)) {
      return false;
    }
    let dns = dnsStdout.split("pointer")[1].trim();
    dns = dns.substring(0, dns.length - 1);

    const ipStdout = execSync(`host ${dns}`, { encoding: "utf8" });
    if (!ipStdout) {
      return false;
    }

    const parsedIP = ipStdout.split("address")[1].trim();
    return parsedIP === ip;
  } catch (err) {
    return false;
  }
};

const platform = "Google";
const cidrStr = "66.249.64.0/19";

const cidr = new IPCIDR(cidrStr);

if (!cidr.isValid()) {
  throw new Error("CIDR is invalid");
}

cidr.loop((ip) => {
  console.log(`Lookup DNS [${platform}] - [${cidrStr}]: ${ip}`);
  const isBot = lookup(ip, platform);
  if (ip === "66.249.66.1") {
    console.log("ALJKJLKAJDKAJDK: ", isBot);
  }
  if (isBot) {
    fs.appendFile("./log", `[${platform}] - [${cidrStr}]: ${ip}`, () => {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });
  }
});
