const abi = [
    {
      inputs: [
        {
          internalType: 'string',
          name: 'gg',
          type: 'string',
        },
        {
          internalType: 'string',
          name: 'gg2',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'gg3',
          type: 'uint256',
        },
        {
          internalType: 'bool',
          name: 'gg4',
          type: 'bool',
        },
      ],
      name: 'addtodbhosts',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'gg1',
          type: 'uint256',
        },
        {
          internalType: 'string[]',
          name: 'gg2',
          type: 'string[]',
        },
        {
          internalType: 'uint256',
          name: 'gg10',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'gg11',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'gg12',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'gg13',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'gg14',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'gg15',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: 'gg16',
          type: 'string',
        },
      ],
      name: 'addtodblodges',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'gg1',
          type: 'string',
        },
        {
          internalType: 'string',
          name: 'gg2',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'gg3',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'gg4',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'gg5',
          type: 'uint256',
        },
      ],
      name: 'addtodbreservs',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'filldb',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'bwh',
          type: 'string',
        },
      ],
      name: 'retrievehosts',
      outputs: [
        {
          components: [
            {
              internalType: 'string',
              name: 'name',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'image_url',
              type: 'string',
            },
            {
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
            {
              internalType: 'bool',
              name: 'superhost',
              type: 'bool',
            },
          ],
          internalType: 'struct Storage.Host',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'bwh',
          type: 'string',
        },
      ],
      name: 'retrievereservs',
      outputs: [
        {
          components: [
            {
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'lodgeid',
              type: 'uint256',
            },
            {
              internalType: 'string',
              name: 'datein',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'dateout',
              type: 'string',
            },
            {
              internalType: 'uint256',
              name: 'guestid',
              type: 'uint256',
            },
          ],
          internalType: 'struct Storage.Reserv',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'combs',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'bb1',
          type: 'string',
        },
      ],
      name: 'ourtest',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'bwh',
          type: 'string',
        },
      ],
      name: 'retrievelodges',
      outputs: [
        {
          components: [
            {
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
            {
              internalType: 'string',
              name: 'city',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'country',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'description',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'name',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'state',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'stateabbrv',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'longitude',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'latitude',
              type: 'string',
            },
            {
              internalType: 'uint256',
              name: 'guests',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'bedrooms',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'baths',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'price',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'hostid',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'rating',
              type: 'uint256',
            },
            {
              internalType: 'string',
              name: 'image_url',
              type: 'string',
            },
          ],
          internalType: 'struct Storage.Lodge',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ];

  module.exports = {
      abi
    };