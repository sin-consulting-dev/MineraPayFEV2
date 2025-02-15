<?php

namespace Database\Seeders;

use App\Models\Bank;
use Illuminate\Database\Seeder;

class BankSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $banks = [
            ['name' => 'Bank BCA', 'code' => '014'],
            ['name' => 'Bank Mega', 'code' => '426'],
            ['name' => 'Bank UOB Indonesia', 'code' => '023'],
            ['name' => 'Bank CIMB Niaga', 'code' => '022'],
            ['name' => 'Bank BTPN', 'code' => '213'],
            ['name' => 'Bank Permata', 'code' => '013'],
            ['name' => 'Bank Danamon', 'code' => '011'],
            ['name' => 'Bank BII Maybank', 'code' => '016'],
            ['name' => 'Bank Sinarmas', 'code' => '153'],
            ['name' => 'Bank Commonwealth', 'code' => '950'],
            ['name' => 'Bank OCBC NISP', 'code' => '028'],
            ['name' => 'Bank KB Bukopin', 'code' => '441'],
            ['name' => 'Bank Lippo', 'code' => '026'],
            ['name' => 'Bank DBS Indonesia', 'code' => '046'],
            ['name' => 'Bank Panin', 'code' => '019'],
            ['name' => 'Bank HSBC Indonesia', 'code' => '087'],
            ['name' => 'Bank Mayapada', 'code' => '097'],
            ['name' => 'Allo Bank', 'code' => '567'],
            ['name' => 'SeaBank', 'code' => '535'],
            ['name' => 'Neobank', 'code' => '490'],
            ['name' => 'Bank Jago', 'code' => '542'],
            ['name' => 'Hibank', 'code' => '553'],
            ['name' => 'BCA Digital', 'code' => '501'],
            ['name' => 'Digibank', 'code' => '046'],
            ['name' => 'Jenius BTPN', 'code' => '213'],
            ['name' => 'Line Bank', 'code' => '484'],
            ['name' => 'Superbank', 'code' => '562'],
            ['name' => 'Bank Arta Niaga Kencana', 'code' => '020'],
            ['name' => 'Bank Ekspor Indonesia', 'code' => '003'],
            ['name' => 'Bank Multicor', 'code' => '036'],
            ['name' => 'Bank Artha Graha Internasional', 'code' => '037'],
            ['name' => 'Bank Credit Agricole Indosuez', 'code' => '039'],
            ['name' => 'Bank Resona Perdania', 'code' => '047'],
            ['name' => 'Bank ABN AMRO', 'code' => '052'],
            ['name' => 'Bank Keppel Tatlee Buana', 'code' => '053'],
            ['name' => 'Bank Capital Indonesia', 'code' => '054'],
            ['name' => 'Bank BNP Paribas Indonesia', 'code' => '057'],
            ['name' => 'Bank ANZ Indonesia', 'code' => '061'],
            ['name' => 'Bank Woori Saudara', 'code' => '212'],
            ['name' => 'Bank Bumi Arta', 'code' => '076'],
            ['name' => 'Bank AntarDaerah', 'code' => '088'],
            ['name' => 'Bank Haga', 'code' => '089'],
            ['name' => 'Bank IFI', 'code' => '093'],
            ['name' => 'Bank J Trust Indonesia', 'code' => '095'],
            ['name' => 'Bank Nusantara Parahyangan', 'code' => '145'],
            ['name' => 'Bank Mestika Dharma', 'code' => '151'],
            ['name' => 'Bank SHINHAN Indonesia (Bank Metro Express)', 'code' => '152'],
            ['name' => 'Bank Maspion Indonesia', 'code' => '157'],
            ['name' => 'Bank Hagakita', 'code' => '159'],
            ['name' => 'Bank Ganesha', 'code' => '161'],
            ['name' => 'Bank Windu Kentjana', 'code' => '162'],
            ['name' => 'Bank ICBC Indonesia', 'code' => '164'],
            ['name' => 'Bank Harmoni International', 'code' => '166'],
            ['name' => 'Bank QNB Kesawan', 'code' => '167'],
            ['name' => 'Bank Himpunan Saudara 1906', 'code' => '212'],
            ['name' => 'Bank Swaguna', 'code' => '405'],
            ['name' => 'Bank Bisnis Internasional', 'code' => '459'],
            ['name' => 'Bank Sri Partha', 'code' => '466'],
            ['name' => 'Bank Jasa Jakarta', 'code' => '472'],
            ['name' => 'Bank Hana', 'code' => '484'],
            ['name' => 'Bank MNC Internasional', 'code' => '485'],
            ['name' => 'Bank Yudha Bhakti', 'code' => '490'],
            ['name' => 'Bank Mitraniaga', 'code' => '491'],
            ['name' => 'Bank Raya (BRI Agro Niaga)', 'code' => '494'],
            ['name' => 'Bank SBI Indonesia (Bank Indomonex)', 'code' => '498'],
            ['name' => 'Bank Royal Indonesia', 'code' => '501'],
            ['name' => 'Bank National Nobu', 'code' => '503'],
            ['name' => 'Bank Ina Perdana', 'code' => '513'],
            ['name' => 'Bank Harfa', 'code' => '517'],
            ['name' => 'Bank Persyarikatan Indonesia', 'code' => '521'],
            ['name' => 'Bank Akita', 'code' => '525'],
            ['name' => 'Bank Oke Indonesia', 'code' => '526'],
            ['name' => 'Bank Sahabat Sampoerna', 'code' => '523'],
            ['name' => 'Bank Purba Danarta', 'code' => '547'],
            ['name' => 'Bank Multi Arta Sentosa', 'code' => '548'],
            ['name' => 'Bank Mayora Indonesia', 'code' => '553'],
            ['name' => 'Bank Index Selindo', 'code' => '555'],
            ['name' => 'Bank Fama Internasional', 'code' => '562'],
            ['name' => 'Bank Mandiri Taspen Pos', 'code' => '564'],
            ['name' => 'Bank Agris', 'code' => '945'],
            ['name' => 'Bank Merincorp', 'code' => '946'],
            ['name' => 'BPR KS', 'code' => '688'],
            ['name' => 'BPR Supra Artapersada', 'code' => '600'],
            ['name' => 'BPR Danagung Abadi', 'code' => '028'],
            ['name' => 'BPR Danagung Bakti', 'code' => '028'],
            ['name' => 'BPR Danagung Ramulti', 'code' => '028'],
            ['name' => 'Bank IBK Indonesia', 'code' => '945'],
            ['name' => 'Citibank', 'code' => '031'],
            ['name' => 'Bank Eksekutif', 'code' => '558'],
            ['name' => 'Prima Master Bank', 'code' => '520'],
            ['name' => 'Anglomas Internasional Bank', 'code' => '531'],
            ['name' => 'Centratama Nasional Bank', 'code' => '559'],
            ['name' => 'The Bank of Tokyo Mitsubishi UFJ LTD', 'code' => '042'],
            ['name' => 'American Express Bank LTD', 'code' => '030'],
            ['name' => 'JP. Morgan Chase Bank, N.A.', 'code' => '032'],
            ['name' => 'Bank of America, N.A', 'code' => '033'],
            ['name' => 'Ing Indonesia Bank', 'code' => '034'],
            ['name' => 'The Bangkok Bank Comp. LTD', 'code' => '040'],
            ['name' => 'Bank Sumitomo Mitsui Indonesia', 'code' => '045'],
            ['name' => 'Bank Mizuho Indonesia', 'code' => '048'],
            ['name' => 'Standard Chartered Bank', 'code' => '050'],
            ['name' => 'Korea Exchange Bank Danamon', 'code' => '059'],
            ['name' => 'RABOBANK Internasional Indonesia', 'code' => '060'],
            ['name' => 'Bank Victoria International', 'code' => '566'],
            ['name' => 'Bank of China', 'code' => '069'],
            ['name' => 'Bank Swadesi (Bank of India Indonesia)', 'code' => '146'],
            ['name' => 'Bank CTBC (China Trust) Indonesia', 'code' => '949']
        ];

        Bank::truncate();
        Bank::insert($banks);
    }
}
