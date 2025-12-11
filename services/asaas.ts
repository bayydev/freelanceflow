// ATENÇÃO: Em produção, nunca exponha chaves API no frontend.
// Utilize Supabase Edge Functions ou um backend para intermediar isso.

const ASAAS_API_KEY = '$aact_prod_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OjU2YTk1ZTc5LThiYWYtNDAzYS1hZDNiLWNjNzIxYjcxNDViOTo6JGFhY2hfM2YxYWI1OTEtMDBjMy00NDlhLWI1ZWQtODFjZGVmODBiY2Mx';
const BASE_URL = 'https://api.asaas.com/v3';

export const createPixPayment = async (customerName: string, cpfCnpj: string) => {
  try {
    // 1. Criar ou recuperar cliente (Simplificado para o MVP: Cria sempre um novo ou usa dados fictícios se falhar validação)
    // Em um cenário real, você buscaria o cliente pelo CPF/Email antes.

    const customerResponse = await fetch(`${BASE_URL}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': ASAAS_API_KEY
      },
      body: JSON.stringify({
        name: customerName,
        cpfCnpj: cpfCnpj
      })
    });

    if (!customerResponse.ok) {
      // Se a resposta não for ok (ex: 400, 401, 500), tentamos ler o erro
      const errData = await customerResponse.json().catch(() => ({}));
      throw new Error(errData.errors?.[0]?.description || `Erro Asaas: ${customerResponse.status}`);
    }

    const customerData = await customerResponse.json();
    const customerId = customerData.id;

    if (!customerId) {
      throw new Error("ID do cliente não retornado.");
    }

    // 2. Criar Cobrança
    const paymentResponse = await fetch(`${BASE_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': ASAAS_API_KEY
      },
      body: JSON.stringify({
        customer: customerId,
        billingType: "PIX",
        value: 29.90,
        dueDate: new Date().toISOString().split('T')[0], // Vence hoje
        description: "Assinatura Flow PRO"
      })
    });

    if (!paymentResponse.ok) {
      const errData = await paymentResponse.json().catch(() => ({}));
      throw new Error(errData.errors?.[0]?.description || `Erro Pagamento: ${paymentResponse.status}`);
    }

    const paymentData = await paymentResponse.json();
    if (!paymentData.id) throw new Error("Erro ao gerar cobrança");

    // 3. Pegar QR Code / Payload Pix
    const qrResponse = await fetch(`${BASE_URL}/payments/${paymentData.id}/pixQrCode`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'access_token': ASAAS_API_KEY
      }
    });

    if (!qrResponse.ok) {
      throw new Error("Erro ao buscar QR Code");
    }

    const qrData = await qrResponse.json();
    return {
      success: true,
      payload: qrData.payload,
      encodedImage: qrData.encodedImage,
      paymentId: paymentData.id
    };

  } catch (error: any) {
    console.error("Asaas Error:", error);

    // Detecta erros de rede/CORS comuns em browsers
    const isNetworkError =
      error.message === 'Failed to fetch' ||
      error.message.includes('NetworkError') ||
      error.name === 'TypeError'; // fetch falha com TypeError em rede/CORS

    return {
      success: false,
      shouldSimulate: isNetworkError,
      error: isNetworkError
        ? "Conexão bloqueada pelo navegador (CORS). Ativando modo simulação..."
        : (error.message || "Erro desconhecido")
    };
  }
};