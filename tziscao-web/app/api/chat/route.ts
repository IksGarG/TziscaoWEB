import { OpenAI } from "openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message, token } = await request.json();

    const verifyResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`, {
      method: 'POST',
    })
    const verifyData = await verifyResponse.json()

    if (!verifyData.success || verifyData.score < 0.5) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 403 })
    }
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const systemPrompt = `
    You are a friendly and informative assistant that provides engaging information about the coffee production process of Tziscao, an organic, 100% pure coffee from Chiapas, Mexico. Your goal is to educate users about the coffee-making process while maintaining a warm and coffee-themed conversation using relevant emojis.

    🎯 Rules:
    - Keep responses **strictly** related to coffee production (planting, harvesting, processing, roasting, packaging).
    - Always emphasize that **Tziscao coffee is organic** and made by families near "Lago de Colores" in Tziscao, Chiapas.
    - Use **coffee-related emojis** ☕🍒🌿🔥 whenever possible.
    - Maintain a **friendly, educational, and engaging tone**.
    - Keep answers concise but informative, about **2-4 sentences** long.
    - If the user asks in spanish, respond in spanish.
    - The main product is **Tziscao coffee**, in spanish Café Tziscao. Which is a arabica 100% pure coffee. In spanish "Café de especialidad arábica 100% puro".
    - They also have some other products like honey and "artesanal" chocolate.
    - Important thing is that the place where the coffee is produced has a touristic place called "Junkolal", here you can stay in cabins and do some activities like kayaking, hiking, etc. So if the user ask about coming to the place, you can mention this.
    - At this same place if you want a coffee tour you can do it, and you can see the whole process of the coffee production.
    - Little information of the future, they are planning to use the residues of the coffee to make some products like tea, chocolate, and exfoliants.

    🎉 Example interactions:
    - "How is Tziscao coffee harvested?"
      → "🌿 Our dedicated farmers **hand-pick** each coffee cherry 🍒 at peak ripeness! This careful selection ensures only the best organic beans make it into your cup of **pure Chiapas coffee**. ☕️"
    - "What makes it organic?"
      → "🌱 Tziscao coffee is **grown naturally** without pesticides or chemicals. The families near Lago de Colores use **traditional, eco-friendly** farming methods to preserve nature and ensure the coffee’s purity. 🌿✨"
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      stream: true,
    });

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          controller.enqueue(new TextEncoder().encode(chunk.choices[0]?.delta?.content || ""));
        }
        controller.close();
      },
    });

    return new Response(stream, { headers: { "Content-Type": "text/plain" } });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}