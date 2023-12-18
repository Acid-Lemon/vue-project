const { execSync } = require('child_process');
const { glob } = require('glob');

function exec(str) {
    return new Promise((resolve) => {
        try {
            execSync(str, { stdio: 'inherit' });
        } catch (err) {
            console.log("error:", err);
            process.exit(1);
        } finally {
            resolve();
        }
    });
}

async function main() {
    await exec("prisma generate");

    let tsconfig_files = await glob('**/tsconfig.json', {
        ignore: ['**/node_modules/**', "**/dist/**", "**/.git/**", "**/.idea/**", "**/public/**"]
    });
    tsconfig_files.sort((a, b) => {
        let a_split = a.split("\\");
        let b_split = b.split("\\");
        if (a_split[0] === b_split[0]) {
            return b_split.length - a_split.length;
        }

        if (a_split[0] < b_split[0]) {
            return -1;
        }

        return 1;
    });
    console.log("tsconfig.json files:", tsconfig_files);
    for (let file of tsconfig_files) {
        await exec(`tsc -p ${file}`);
        console.log(`tsc build success. ${file}`);
    }
}

main().then()
