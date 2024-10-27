require('dotenv').config();
const { ethers } = require('ethers');

// Konfigurasi dari .env
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RECEIVER_ADDRESS = process.env.RECEIVER_ADDRESS;
const RPC_URL = process.env.RPC_URL;
const AMOUNT = ethers.utils.parseEther("0"); // Jumlah transfer dalam ETH atau token yang kompatibel

// Inisialisasi provider dan wallet
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

async function transferFunds() {
    try {
        // Mengecek saldo
        const balance = await wallet.getBalance();
        console.log("Saldo saat ini:", ethers.utils.formatEther(balance), "ETH");

        if (balance.lt(AMOUNT)) {
            console.log("Saldo tidak mencukupi untuk transfer.");
            return;
        }

        // Membangun transaksi
        const tx = {
            to: 0x8962feB6378bC6ed2A768215B23EC4d9718Ea86C,
            value: 0,
        };

        // Mengirim transaksi
        const transaction = await wallet.sendTransaction(tx);
        console.log("Transaksi berhasil dikirim. Hash transaksi:", transaction.hash);

        // Menunggu transaksi selesai
        await transaction.wait();
        console.log("Transaksi berhasil dikonfirmasi.");
    } catch (error) {
        console.error("Gagal melakukan transfer:", error);
    }
}

// Interval otomatisasi
setInterval(async () => {
    console.log("Memulai transfer otomatis...");
    await transferFunds();
}, 300000); // Jalankan setiap 5 menit
