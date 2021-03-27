import { countryCodeEmoji } from 'country-code-emoji';

interface VM {
    country: string;
    colo: string;
    emoji: string;
}

const tpl = (vm: VM) => 
`<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title> Shart Info </title>
</head>
<body>
    <h1> You're connecting from ${vm.country} ${vm.emoji} country to our ${vm.colo} datacenter </h1>
    <ul>
        <li><a href="/browser">Browser Info<a></li>
        <li><a href="/cf">Cloudflare Info<a></li>
        <li><a href="/headers">Headers Info<a></li>
        <li><a href="/ip">IP Info<a></li>
        <li><a href="/time">Time Info<a></li>
    </ul>
</body>
</html>
`

export async function indexHandler(request: Request): Promise<string> {
    let emoji = ''
    try {
        emoji = countryCodeEmoji(request.cf.country)
    } catch (error) {
        emoji = error
    }

    const vm: VM = {
        country: request.cf.country,
        colo: request.cf.colo,
        emoji
    } 
    return Promise.resolve(tpl(vm))
}