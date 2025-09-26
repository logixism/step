using dotenv.net;
using Telegram.Bot;
using Telegram.Bot.Types;
using Telegram.Bot.Types.Enums;

DotEnvOptions options = new(envFilePaths: new[] { $"D:\\Projects\\step\\c#\\2025-09-26tgbot\\.env" });
DotEnv.Load(options);

string? botToken = Environment.GetEnvironmentVariable("BOT_TOKEN");

if (string.IsNullOrEmpty(botToken))
{
    Console.WriteLine("set token");
    return;
}

using var cts = new CancellationTokenSource();
var bot = new TelegramBotClient(botToken, cancellationToken: cts.Token);
var me = await bot.GetMe();

string[] stickers = new[] {
    "CAACAgIAAxkBAAEPcplo1rSgL3RPYJ80oGqhP8HtGZ_rQAACtBQAAmW9gEnqtC3QL-KfVDYE",
    "CAACAgIAAxkBAAEPcpto1rTArIIBQW1lAzcatO-4YpSUUAACLhUAAnIb-UiFBPlDs_Pz2TYE",
    "CAACAgIAAxkBAAEPcp1o1rTMq8bTzsqqYfel7_mzojfqEQACJhkAAgnH-EgZikIB8mTaDDYE"
};

string getRandomSticker() => stickers[new Random().Next(stickers.Length)];

bot.OnMessage += OnMessage;


async Task OnMessage(Message msg, UpdateType type)
{
    if (msg.Text is null) return;

    string lowerText = msg.Text.ToLower();

    switch (lowerText)
    {
        case "/start":
            await bot.SendMessage(msg.Chat.Id, "use /help to view cmds");
            break;

        case "sticker":
            await bot.SendSticker(msg.Chat.Id, getRandomSticker());
            break;

        case "hello":
            await bot.SendMessage(msg.Chat.Id, $"hello, {msg.From!.FirstName}");
            break;

        default:
            break;
    }
}

Console.WriteLine($"@{me.Username} is running... Press Enter to terminate");
Console.ReadLine();
cts.Cancel();